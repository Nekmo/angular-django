import {Component, ViewChild, OnInit, AfterViewInit, ElementRef} from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { MatInput } from '@angular/material/input';
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'formly-autocomplete-type',
  template: `
    <input matInput #inputElement
      (blur)="blur();"
      [matAutocomplete]="auto"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [placeholder]="to.placeholder"
      [errorStateMatcher]="errorStateMatcher">
    <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayName" (closed)="closed();"
                      (optionSelected)="focusOut();">
      <mat-option *ngFor="let value of filter | async" [value]="value || null">
        {{ value.getName() }}
      </mat-option>
    </mat-autocomplete>
  `,
})
export class AutocompleteTypeComponent extends FieldType implements OnInit, AfterViewInit {
  @ViewChild(MatInput) formFieldControl: MatInput;
  @ViewChild('inputElement') inputElement: ElementRef;
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

  formControl: FormControl;
  filter: Observable<any>;

  ngOnInit() {
    super.ngOnInit();
    this.filter = this.formControl.valueChanges
      .pipe(
        startWith(''),
        switchMap(term => this.to.filter(term)),
      );
  }

  displayName(option: { getName: () => string }): string {
    if (!option) {
      return '';
    }
    return option.getName();
  }

  closed(): void {
    if (typeof this.formControl.value === 'string') {
      // Reset invalid choice
      this.formControl.setValue(null);
    }
  }

  blur(): void {
    setTimeout(() => {
      // there is a delay between blurring and selecting the element
      this.closed();
    }, 100);
  }

  focusOut(): void {
    this.inputElement.nativeElement.blur();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    // temporary fix for https://github.com/angular/material2/issues/6728
    (this.autocomplete as any)._formField = this.formField;
  }
}
