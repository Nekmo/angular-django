import 'reflect-metadata';
import {Widget} from './widgets';


// TODO: remove
// export function InputConverter(converter?: (api, value: any) => any) {
//     return (target: Object, key: string) => {
//         if (converter === undefined) {
//             let metadata = (<any>Reflect).getMetadata("design:type", target, key);
//             if (metadata === undefined || metadata === null)
//                 throw new Error("The reflection metadata could not be found.");
//
//             // if (metadata.name === "String")
//             //     converter = StringConverter;
//             // else if (metadata.name === "Boolean")
//             //     converter = BooleanConverter;
//             // else if (metadata.name === "Number")
//             //     converter = NumberConverter;
//             // else
//             //     throw new Error("There is no converter for the given property type '" + metadata.name + "'.");
//         }
//
//         let definition = Object.getOwnPropertyDescriptor(target, key);
//         if (definition) {
//             Object.defineProperty(target, key, {
//                 get: definition.get,
//                 set: newValue => {
//                     definition.set(converter(this.api, newValue));
//                 },
//                 enumerable: true,
//                 configurable: true
//             });
//         } else {
//             Object.defineProperty(target, key, {
//                 get: function () {
//                     return this["__" + key];
//                 },
//                 set: function (newValue) {
//                     // TODO: API
//                     this["__" + key] = converter(this.api, newValue);
//                 },
//                 enumerable: true,
//                 configurable: true
//             });
//         }
//     };
// }


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


export function Field(options?: FieldOptions) {
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


// @Injectable({
//     providedIn: 'root'
// })
export class SerializerService {
    // _api;

    constructor(api, data) {
        // this._api = api;
        // this.transformData(data);
        Object.assign(this, data);
    }

    // transformData(data) {
    //     let fields = this.constructor['fields'] || {};
    //     if(data === null) {
    //         // Instance is null on model
    //         return null
    //     }
    //     Object.entries(fields).forEach(([name, options]) => {
    //         let type = options['type'];
    //         if(data[name] === undefined) {
    //             return
    //         }
    //         if(options['isSerializer'] && options['many']) {
    //             data[name] = data[name].map((item) => new type(this._api, item));
    //         } else if(options['isSerializer']) {
    //             // TODO: no es su propio serializer
    //             data[name] = new type(this._api, data[name]);
    //         } else if(type == Date) {
    //             data[name] = new type(data[name]);
    //         } else if(type) {
    //             data[name] = type(data[name]);
    //         }
    //     })
    // }
    //
    // getData() {
    //     let newData = {};
    //     Object.keys(this).forEach((key) => {
    //         if(key.startsWith('_')) {
    //             return;
    //         }
    //         let value = this[key];
    //         if(value && value['getData']) {
    //             value = value['getData']();
    //         }
    //         newData[key] = value;
    //     });
    //     return newData;
    // }
    //
    // getPk() {
    //     return this['id'];
    // }
    //
    // getValue(name) {
    //     let value = this;
    //     name.split('__').forEach((item) => {
    //         value = value[item];
    //         if((value || {})['type'] == 'nested object') {
    //             value = value['children'];
    //         }
    //     });
    //     return value;
    // }
    //
    // getDisplayName(field) {
    //     let value = this.getValue(field);
    //     if(!value) {
    //         return '';
    //     }
    //     let choices = this._api.getChoices(field);
    //     let parts = field.split('__');
    //     return choices.find((option) => option['value'] == value )['display_name'];
    // }
    //
    // static getFieldOptions(field) {
    //     if(field.indexOf('__') >= 0) {
    //         let fields = field.split('__');
    //         let nextFields = fields.splice(1);
    //         let type_ = this.getNestedSerializer(fields[0]);
    //         if(type_ === undefined) {
    //             throw new Error(`Missing serializer for ${fields[0]} on ${field}`);
    //         }
    //         if(type_.prototype['__proto__'].constructor.name == 'SerializerService') {
    //             return type_.getFieldOptions(nextFields.join('__'));
    //         } else {
    //             // TODO
    //         }
    //     }
    //     let fields = (this.prototype.constructor['fields'] || {});
    //     return (fields[field] || {})
    // }
    //
    // static getNestedSerializer(field) {
    //     // if(field.indexOf('__')) {
    //     //     let fields = field.split('__');
    //     //     let nextFields = fields.splice(1);
    //     // }
    //     return this.getFieldOptions(field)['type'];
    // }
    //
    // static getWidget(field) {
    //     return this.getNestedSerializer(field);
    // }
    //
    // save() {
    //     return this._api.save(this.getPk(), this.getData());
    // }
    //
    // delete() {
    //     return this._api.delete(this.getPk());
    // }
}
