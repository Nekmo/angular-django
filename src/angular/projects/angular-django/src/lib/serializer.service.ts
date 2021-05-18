import 'reflect-metadata';
import {Widget} from './widgets';
import {ApiService, OptionField} from './api.service';
import {map} from 'rxjs/operators';
import {getNestedDictionary} from './utils';
import {Observable} from 'rxjs';
import {Dictionary} from './utility-types';


function isConstructor(f: any): boolean {
  try {
    // tslint:disable-next-line:no-unused-expression
    new f();
  } catch (err) {
    return false;
  }
  return true;
}

/**
 * Options for a serializer field. All are optional.
 */
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


/**
 * Set a model field in a serializer. For example:
 *
 * export class Specie extends SerializerService {
 *   @Field() field_name: string;
 *   @Field() other_model: OtherModel;
 *   @Field({many: true}) instances: SubModel[];
 * }
 *
 * @param options: options for a field. See FieldOptions.
 */
export function Field(options?: FieldOptions): (target: object, key: string) => void {
  if (!options) {
    options = {};
  }
  return (target: SerializerService, key: string) => {
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


// @dynamic
export class SerializerService {
  // tslint:disable-next-line:variable-name
  _api: ApiService;
  pk: string|number = null;

  constructor(api, data) {
    this._api = api;
    this.transformData(data);
    if (data['pk'] === undefined) {
      this.pk = data['id'];
    }
    Object.assign(this, data);
  }

  /**
   * Get field names in this serializer
   */

  static get fieldNames(): string[] {
    return Object.keys(this['fields']);
  }

  /**
   * Update this object using data. All parameters are overwrite using
   * PUT method.
   *
   * @param data: parameters for overwrite.
   */
  update(data: Dictionary<any>): Observable<any> {
    return this._api.update(this.pk, data);
  }

  /**
   * Update this object using data. All parameters are overwrite using
   * PATCH method.
   *
   * @param data: parameters for overwrite.
   */
  partial_update(data: Dictionary<any>): Observable<any> {
    return this._api.partial_update(this.pk, data);
  }

  /**
   * Update the object server using overwrited data in this instance.
   *
   */
  save(): Observable<any> {
    return this._api.update(this.pk, this.getData());
  }

  /**
   * Delete this object in the server
   */
  delete(): Observable<any> {
    return this._api.delete(this.pk);
  }

  /**
   * Get instance parameters.
   */
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

  /**
   * Get options for a field. It has the information about the field like the label.
   * The information is loaded from the server using OPTIONS
   *
   * @param fieldName: name of the field. Double low bar can be used to access a nested model.
   */
  getOptionField(fieldName: string): Observable<OptionField> {
    return this._api.options().pipe(map(options => options.getField(fieldName)));
  }

  /**
   * Get the display name for a field with choices. Names are loaded from the server.
   *
   * @param fieldName: name of the field. Double low bar can be used to access a nested model.
   */
  getDisplay(fieldName: string): Observable<string> {
    const value = getNestedDictionary(this, fieldName);
    return this._api.options().pipe(map(options => {
      return options.getDisplay(fieldName, value);
    }));
  }

  /**
   * Get value for a field name in this instance or a nested model in this insntace.
   *
   * @param fieldName: name of the field. Double low bar can be used to access a nested model.
   */
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
