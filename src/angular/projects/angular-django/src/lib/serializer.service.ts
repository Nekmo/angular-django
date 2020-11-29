import 'reflect-metadata';
import {Widget} from './widgets';
import {ApiService, OptionField} from './api.service';
import {map} from 'rxjs/operators';
import {getNestedDictionary} from './utils';
import {Observable} from 'rxjs';


function isConstructor(f: any): boolean {
  try {
    // tslint:disable-next-line:no-unused-expression
    new f();
  } catch (err) {
    return false;
  }
  return true;
}


export interface FieldOptions {
  type?: any;
  widget?: string | Widget;
  many?: boolean;
  required?: boolean;
  defaultValue?: any;
  readOnly?: boolean;
  writeOnly?: boolean;
  helpText?: string;
  isSerializer?: boolean;
}


export function Field(options?: FieldOptions): (target: object, key: string) => void {
  if (!options) {
    options = {};
  }
  return (target: object, key: string) => {
    const metadata = (Reflect as any).getMetadata('design:type', target, key);
    if (!options.type) {
      options.type = metadata;
    }
    if (target.constructor['fields'] === undefined) {
      target.constructor['fields'] = {};
    }
    options.isSerializer = (options.type && options.type.prototype['__proto__'] &&
      options.type.prototype['__proto__'].constructor.name === 'SerializerService');
    target.constructor['fields'][key] = options;
  };
}


export class SerializerService {
  // tslint:disable-next-line:variable-name
  _api: ApiService;

  constructor(api, data) {
    this._api = api;
    this.transformData(data);
    Object.assign(this, data);
  }

  get pk(): any {
    return this['id'];
  }

  update(data): Observable<any> {
    return this._api.update(this.pk, data);
  }

  partial_update(data): Observable<any> {
    return this._api.partial_update(this.pk, data);
  }

  save(): Observable<any> {
    return this._api.update(this.pk, this.getData());
  }

  delete(): Observable<any> {
    return this._api.delete(this.pk);
  }

  getData(): {} {
    const newData = {};
    Object.keys(this.constructor['fields']).forEach((key: string) => {
      let value = this[key];
      if (value && value.getData) {
        value = value.getData();
      }
      newData[key] = value;
    });
    return newData;
  }

  getOptionField(fieldName: string): Observable<OptionField> {
    return this._api.options().pipe(map(options => options.getField(fieldName)));
  }

  getDisplay(fieldName: string): Observable<string> {
    const value = getNestedDictionary(this, fieldName);
    return this._api.options().pipe(map(options => {
      return options.getDisplay(fieldName, value);
    }));
  }

  getValue(fieldName): any {
    return getNestedDictionary(this, fieldName);
  }

  private transformData(data): void {
    const fields = this.constructor['fields'] || {};
    if (data === null) {
      // Instance is null on model
      return null;
    }
    Object.entries(fields).forEach(([name, options]) => {
      const type = options['type'];
      if (data[name] === undefined) {
        return;
      }
      if (options['isSerializer'] && options['many']) {
        const apiService = type.apiClass as ApiService;
        data[name] = data[name].map((item) => new type(this._api.injector.get(apiService), item));
      } else if (options['isSerializer']) {
        const apiService = type.apiClass as ApiService;
        data[name] = new type(this._api.injector.get(apiService), data[name]);
      } else if (type === Date) {
        data[name] = new type(data[name]);
      } else if ([String, Number].indexOf(String) > -1) {
        // No transform native types
        return;
      } else if (type && isConstructor(type)) {
        data[name] = new type(data[name]);
      } else if (type) {
        throw Error(`Unsupported type ${type}`);
      }
    });
  }

}
