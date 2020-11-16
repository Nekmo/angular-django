import {Component, OnInit, ChangeDetectionStrategy, Input, ViewChild} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {HighlightLoader} from 'ngx-highlightjs';
import {Gist} from 'ngx-highlightjs/plus';
import {strict} from 'assert';
import {MatTabGroup} from '@angular/material/tabs';


export interface GithubFile {
  name: string;
  directory: string;
}

const GITHUB_URL = 'https://raw.githubusercontent.com/Nekmo/angular-django/master/demo/angular/src/app/';
const GITHUB_PREVIEW_URL = 'https://github.com/Nekmo/angular-django/blob/master/demo/angular/src/app/';


@Component({
  selector: 'app-github-code',
  templateUrl: './github-code.component.html',
  styleUrls: ['./github-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GithubCodeComponent implements OnInit {

  private _stateSource = new BehaviorSubject<GistState>({
    libLoaded: false,
    gistLoaded: false,
    text: ''
  });

  state$ = this._stateSource.pipe(
    map((state) => ({
      loaded: state.gistLoaded && state.libLoaded,
      text: state.text,
      gist: state.gist
    }))
  );

  GITHUB_URL: string;
  @Input() files: GithubFile[];
  @ViewChild(MatTabGroup) tab: MatTabGroup;

  constructor(public hljsLoader: HighlightLoader) {
    this.GITHUB_URL = GITHUB_URL;
  }

  ngOnInit() {
    this.setState({ libLoaded: false, gistLoaded: false, text: 'Loading gist...' });
    this.hljsLoader.ready.subscribe(() => this.setState({ libLoaded: true, text: '' }));
  }

  onGistLoad(gist: Gist) {
    this.setState({ gist, gistLoaded: true, text: 'Loading highlight.js library...' });
  }

  private setState(state: GistState) {
    this._stateSource.next({ ...this._stateSource.value, ...state });
  }

  get currentFileLink(): string {
    if (!this.tab) {
      return;
    }
    const file: GithubFile = this.files[this.tab.selectedIndex];
    return GITHUB_PREVIEW_URL + file.directory + '/' + file.name;
  }

}

interface GistState {
  libLoaded?: boolean;
  gistLoaded?: boolean;
  text?: string;
  gist?: Gist;
}
