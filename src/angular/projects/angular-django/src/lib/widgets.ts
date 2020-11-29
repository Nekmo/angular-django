import {DjangoFormlyField, FormlyTemplateOptions} from './form';
import {FieldOptions} from './serializer.service';

export class Widget {
  name?: string;
  type: string;
  templateOptionsType?: string;

  updateTemplateOptions?(templateOptions: FormlyTemplateOptions, formlyField: DjangoFormlyField): void {
    if (this.templateOptionsType) {
      templateOptions.type = this.templateOptionsType;
    }
  }

  constructor(options?: Widget) {
    if (options) {
      Object.assign(this, options);
    }
  }
}


export class SelectWidget extends Widget {
  type = 'select';
  name = 'select';

  updateTemplateOptions(templateOptions: FormlyTemplateOptions, formlyField: DjangoFormlyField): void {
    if ( formlyField.api.hasOptions ) {
      templateOptions.options = formlyField.api.getOptionField(formlyField.key).choices.map((item => {
        return {value: item.value, label: item.display_name};
      }));
    } else {
      templateOptions.options = [];
    }
  }
}

export class AutocompleteWidget extends Widget {
  type = 'autocomplete';
  name = 'autocomplete';

  updateTemplateOptions(templateOptions: FormlyTemplateOptions, formlyField: DjangoFormlyField): void {
    const field: FieldOptions = formlyField.api.serializer.fields[formlyField.key];
    // Improvement: cache term results;
    templateOptions.filter = (term) => {
      if (typeof term !== 'string') {
        term = '';
      }
      return formlyField.api.injector.get(field.type.apiClass).search(term).list();
    };
  }
}


export const FORM_TYPES = {
  number: new Widget({type: 'input', name: 'number', templateOptionsType: 'number'}),
  boolean: new Widget({type: 'checkbox', name: 'boolean'}),
  date: new Widget({type: 'datepicker', name: 'date'}),
  choice: new SelectWidget(),
  'nested object': new AutocompleteWidget(),
};
export const DEFAULT_TYPE = 'input';



export function getWidgetFromName(name: string): Widget {
  return Object.keys(FORM_TYPES).map(key => FORM_TYPES[key]).find((w => w.name === name));
}
