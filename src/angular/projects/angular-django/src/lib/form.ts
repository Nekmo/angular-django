import "reflect-metadata";
import {catchError, shareReplay} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {ApiService, OptionField, OptionFilterField} from './api.service';
import {FieldOptions} from './serializer.service';
import {getWidgetFromName, Widget, DEFAULT_TYPE, FORM_TYPES} from './widgets';


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
  required: boolean;
  defaultValue?: any;
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
    let widget: Widget | null = null;
    let fieldOptions: FieldOptions | null = null;
    if ( this.key && !this.type ) {
      widget = this.getWidget();  // Get type for input here
    }
    if (this.key) {
      this.type = (widget ? widget.type : DEFAULT_TYPE);
      fieldOptions = this.getFieldOptions();
    }
    if ( this.key && !this.className ) {
      this.className = 'flex-1';  // Get type for input here
    }
    if ( this.key && !this.templateOptions ) {
      this.templateOptions = this.getTemplateOptions(widget);
    }
    if (fieldOptions && fieldOptions.defaultValue !== undefined) {
      this.defaultValue = this.getFieldOptions().defaultValue;
    }
    if (this.key && !this.api.hasOptions) {
      this.lifecycle = {
        onInit: (form, formField) => {
          this.api.options().subscribe(() => {
            const djangoFormlyField: DjangoFormlyField = (new DjangoFormlyField(field, this.api));
            formField.defaultValue = djangoFormlyField.defaultValue;
            Object.assign(formField.templateOptions, djangoFormlyField.templateOptions);
          });
        },
      };
    }
  }

  getFieldOptions(): FieldOptions | null {
    return this.api.serializer.fields[this.key];
  }

  getWidget(): Widget | null {
    // Try to get widget from api serializer field
    const fieldOptions: FieldOptions | null = this.getFieldOptions();
    let widget: string | Widget | null = (fieldOptions ? fieldOptions.widget : null);
    if (typeof widget === 'string') {
      widget = getWidgetFromName(widget);
    }
    if (!widget && fieldOptions && fieldOptions.type) {
      // Try to get widget from type in field serializer
      widget = ((fieldOptions ? FORM_TYPES[fieldOptions.type.name.toLowerCase()] : null) as Widget);
    }
    if (!widget) {
      // Try to get widget from api OPTIONS request
      const optionField: OptionField|OptionFilterField = this.getOptionField(this.key);
      widget = ((optionField ? FORM_TYPES[optionField.type] : null) as Widget);
    }
    return widget;
  }

  getTemplateOptions(widget: Widget): FormlyTemplateOptions {
    const templateOptions: FormlyTemplateOptions = {};
    if ( this.key && !templateOptions.label ) {
      const optionField: OptionField = this.api.getOptionField(this.key);
      templateOptions.label = (optionField ? optionField.label : '') || toTitleCase(this.key);
    }
    if ( this.key && !templateOptions.placeholder ) {
      templateOptions.placeholder = `Enter ${templateOptions.label.toLowerCase()}`;
    }
    const optionField: OptionField|OptionFilterField = this.getOptionField(this.key);
    const fieldOptions: FieldOptions | null = this.getFieldOptions();
    templateOptions.required = [this.required, fieldOptions?.required]
      .find((x) => x !== undefined);
    if (widget) {
      widget.updateTemplateOptions(templateOptions, this);
    }
    return templateOptions;
  }

  getOptionField(key): null | OptionField | OptionFilterField {
    return this.api.getOptionField(key);
  }
}


export class DjangoFormlyFilterField extends DjangoFormlyField {
  getFieldOptions(): FieldOptions | null {
    return {};
  }

  getOptionField(key): null | OptionFilterField {
    return this.api.getFiltersOptionField(key);
  }

  // getWidget(): Widget | null {
  //   return null;
  // }

  // getTemplateOptions(widget: Widget): FormlyTemplateOptions {
  //   return {label: this.key};
  // }
}
