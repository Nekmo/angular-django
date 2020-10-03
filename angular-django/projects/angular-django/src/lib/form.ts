import {catchError, shareReplay} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {ApiService, OptionField} from './api.service';
import "reflect-metadata";
import {FieldOptions} from './serializer.service';


const FORM_TYPES = {
  choice: 'select',
  'nested object': 'autocomplete',
};
const DEFAULT_TYPE = 'input';


export interface FormlyTemplateOptions {
  type?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  options?: any[] | Observable<any[]>;
  rows?: number;
  cols?: number;
  description?: string;
  hidden?: boolean;
  max?: number;
  min?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string | RegExp;
  required?: boolean;
  tabindex?: number;
  readonly?: boolean;
  attributes?: { [key: string]: string | number };
  step?: number;
  [additionalProperties: string]: any;
}


export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}


export function catchFormError(form): any {
  // @ts-ignore
  return catchError((err: any) => {
    Object.keys(err.error).forEach(key => {
      const value = err.error[key];
      const errorDict = {};
      for (const item of value) {
        errorDict[item] = {message: item};
      }
      if (form.controls[key]) {
        form.controls[key].setErrors(errorDict);
      }
    });
    return throwError(err);
  });
}


export class DjangoFormlyField {
  key: string;
  type: string;
  className?: string;
  fieldGroupClassName?: string;
  fieldGroup?: DjangoFormlyField;
  templateOptions: FormlyTemplateOptions;
  lifecycle: {onInit: (form, formField) => void};

  constructor(field: string | DjangoFormlyField | {}, public api: ApiService) {
    if (typeof field === 'string') {
      this.key = field;
    }else if (Array.isArray(field)) {
      this.fieldGroupClassName = 'display-flex';
      this.fieldGroup = this.api.getFormFields(field);
    } else {
      Object.assign(this, field);
    }
    if ( this.key && !this.type ) {
      this.type = this.getType();  // Get type for input here
    }
    if ( this.key && !this.className ) {
      this.className = 'flex-1';  // Get type for input here
    }
    if ( this.key && !this.templateOptions ) {
      this.templateOptions = this.getTemplateOptions();
    }
    if (this.key) {
      this.lifecycle = {
        onInit: (form, formField) => {
          this.api.options().subscribe(() => {
            Object.assign(formField, (new DjangoFormlyField(field, this.api)));
          });
        },
      };
    }
  }

  getType(): string {
    const optionField: OptionField = this.api.getOptionField(this.key);
    let type: string | null = (optionField ? FORM_TYPES[optionField.type] : null);
    if (!type) {
      const fieldOptions: FieldOptions | null = this.api.serializer.fields[this.key];
      type = (fieldOptions ? fieldOptions.formType : null);
    }
    return type || DEFAULT_TYPE;
  }

  getTemplateOptions(): FormlyTemplateOptions {
    const templateOptions: FormlyTemplateOptions = {};
    if ( this.key && !templateOptions.label ) {
      const optionField: OptionField = this.api.getOptionField(this.key);
      templateOptions.label = (optionField ? optionField.label : '') || toTitleCase(this.key);
    }
    if ( this.key && !templateOptions.placeholder ) {
      templateOptions.placeholder = `Enter ${templateOptions.label.toLowerCase()}`;
    }
    if ( this.type === 'select' && this.api.hasOptions ) {
      templateOptions.options = this.api.getOptionField(this.key).choices.map((item => {
        return {value: item.value, label: item.display_name};
      }));
    } else if (this.type === 'select') {
      templateOptions.options = [];
    }
    if ( this.type === 'autocomplete' ) {
      const field: FieldOptions = this.api.serializer.fields[this.key];
      // Improvement: cache term results;
      templateOptions.filter = (term) => {
        if (typeof term !== 'string') {
          term = '';
        }
        return this.api.injector.get(field.type.api_class).search(term).list();
      };
    }
    return templateOptions;
  }
}
