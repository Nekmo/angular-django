import {ContentChild, Directive, Input, TemplateRef} from '@angular/core';


@Directive({
    selector: '[admCellDef]',
})
export class DjangoCellDefDirective  {
  constructor(/** @docs-private */ public template: TemplateRef<any>) { }
}


@Directive({
  selector: '[admColumnDef]',
})
export class AngularDjangoMaterialColumnDefDirective {
  /** Unique name for this column. */
  @Input('admColumnDef') name: string;

  /** Whether this column should be sticky positioned at the start of the row */

    /** @docs-private */
  @ContentChild(DjangoCellDefDirective) cell: DjangoCellDefDirective;
}
