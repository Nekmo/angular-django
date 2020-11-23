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

export interface GithubRoot {
  url: string;
  previewUrl: string;
}

export interface Dictionary<T> {
    [Key: string]: T;
}

const GITHUB_ROOT: Dictionary<GithubRoot> = {
  angularDemo: {
    url: 'https://raw.githubusercontent.com/Nekmo/angular-django/master/demo/angular/src/app/',
    previewUrl: 'https://github.com/Nekmo/angular-django/blob/master/demo/angular/src/app/',
  },
  djangoDemo: {
    url: 'https://raw.githubusercontent.com/Nekmo/angular-django/master/demo/django/',
    previewUrl: 'https://github.com/Nekmo/angular-django/blob/master/demo/django',
  },
};


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

  @Input() files: GithubFile[];
  @Input() root = 'angularDemo';
  @ViewChild(MatTabGroup) tab: MatTabGroup;
  GITHUB_ROOT: Dictionary<GithubRoot>;

  constructor(public hljsLoader: HighlightLoader) {
    this.GITHUB_ROOT = GITHUB_ROOT;
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
    return GITHUB_ROOT[this.root].previewUrl + '/' + file.directory + '/' + file.name;
  }
}

interface GistState {
  libLoaded?: boolean;
  gistLoaded?: boolean;
  text?: string;
  gist?: Gist;
}
