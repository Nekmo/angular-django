import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-code-highlight',
  // template: `<ng-content></ng-content>`
  templateUrl: './code-highlight.component.html',
  styleUrls: ['./code-highlight.component.scss']
})
export class CodeHighlightComponent implements OnInit {

  constructor() { }

  @Input() code: string;

  ngOnInit(): void {
  }
}
