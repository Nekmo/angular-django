import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-code-highlight',
  // template: `<ng-content></ng-content>`
  templateUrl: './code-highlight.component.html',
  styleUrls: ['./code-highlight.component.scss']
})
export class CodeHighlightComponent implements OnInit, AfterViewInit {

  constructor() { }

  code: string;
  @ViewChild('contentWrapper') content: ElementRef;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let el: any = this.content.nativeElement;
    if (el.firstElementChild) {
      el = el.firstElementChild;
    }
    console.log(el);
    this.code = el.textContent;
  }

}
