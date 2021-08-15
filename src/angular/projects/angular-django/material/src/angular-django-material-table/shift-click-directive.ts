import {
  Directive,
  Input,
  HostListener,
  HostBinding,
  OnInit,
  OnDestroy,
  ElementRef,
} from '@angular/core';

import {SelectionModel, SelectionChange} from '@angular/cdk/collections';

import { Subject, BehaviorSubject, } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {Page} from 'angular-django';



@Directive({
  selector: '[shiftClickSource]'
})
export class ShiftClickDirective implements OnInit, OnDestroy {

  finishHim = new Subject<void>();

  // the item from with the selection originates
  lastItem: any;
  selecting = false;
  shiftHolding$ = new BehaviorSubject<boolean>(false);


  // datasource that is used on the Checkbox-Table
  @Input('shiftClickSource') dataSource: Page<any>;
  @Input('shiftClickSelectModel') selection: SelectionModel<any>;
  @Input('shiftClickReloadSourceEvent') reloadSourceEvent: any;
  @HostListener('document:keydown.shift', ['$event'])
  shiftDown(_) {
    this.userSelect = 'none';
    this.shiftHolding$.next(true);
  }
  @HostListener('document:keyup.shift', ['$event'])
  shiftUp(event: KeyboardEvent) {
    this.userSelect = 'unset';
    this.shiftHolding$.next(false);
  }


  // disable select on mat-table while shift is clicked.
  @HostBinding('style.user-select')
  userSelect = 'unset';

  constructor(private host: ElementRef) {}

  ngOnInit() {
    this.selection.changed
      .pipe(takeUntil(this.finishHim))
      .subscribe((selectionChange: SelectionChange<any>) => {
        const item = selectionChange.added[0] || selectionChange.removed[0];
        if (item && this.lastItem && !this.selecting && this.userSelect === 'none') {
          this.selecting = true;
          const index0 = this.dataSource.indexOf(item);
          const index1 = this.dataSource.indexOf(this.lastItem);
          const indexes = [index0, index1].sort();
          const items = [...this.dataSource].slice(...[indexes[0], indexes[1] + 1]);
          const allSelected = items.filter((value) => value !== item)
            .every((value) => this.selection.isSelected(value));
          if (allSelected) {
            this.selection.deselect(...items);
          } else {
            this.selection.select(...items);
          }
          this.selecting = false;
        }
        this.lastItem = item;
      });
    this.reloadSourceEvent
      .pipe(takeUntil(this.finishHim))
      .subscribe(() => this.reset());
  }

  reset() {
    this.lastItem = null;
    this.selecting = false;
    this.userSelect = 'unset';
  }

  ngOnDestroy() {
    this.finishHim.next();
    this.finishHim.complete();
  }

}
