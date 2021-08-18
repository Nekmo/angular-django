import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-external-html',
  templateUrl: './external-html.component.html',
  styleUrls: ['./external-html.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExternalHtmlComponent implements OnInit, OnChanges {

  @Input() htmlUrl: string;
  htmlContent: SafeHtml;

  constructor(public http: HttpClient, private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.htmlUrl) {
      this.loadHtml();
    }
  }

  loadHtml(): void {
    this.http.get(this.htmlUrl, {responseType: 'text'})
      .subscribe((html: string) => {
        this.htmlContent = html;
        this.ref.markForCheck();
      });
  }

}
