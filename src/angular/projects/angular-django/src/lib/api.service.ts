import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, shareReplay} from 'rxjs/operators';
import {Observable, Subscriber} from 'rxjs';
import {isString} from "util";
import {DjangoFormlyField, toTitleCase} from './form';
import {SerializerService} from './serializer.service';
// import {Observable} from 'rxjs/Rx';
// import {isEqual} from "lodash";


interface ApiPage {
  // Page served from server
  count: number;
  next: string | null;
  previous: string | null;
  results: object[];
}


export class Page<T> extends Array<T> {
  count: number;
  pagesCount: number | null = null;
  hasPreviousPage = false;
  hasNextPage = false;

  get currentPage(): number | null {
    return this.apiService.queryParams['page'] || 1;
  }

  constructor(public apiService: ApiService, items?: Array<T>) {
    super(...items);
    this.apiService = apiService;
  }

  previous(): Observable<Page<any>> {
    return this.apiService.page(this.currentPage - 1).list();
  }

  next(): Observable<Page<any>> {
    return this.apiService.page(this.currentPage + 1).list();
  }
}

export interface Dict<TVal, /*TKey = string*/> {
  [key: string /*TKey*/]: TVal;
}


export type Dictionary<T> = Dict<T>;


export class OptionField {
  type: string;
  required: boolean;
  // tslint:disable-next-line:variable-name
  read_only: boolean;
  label: string;
  choices: {value: string | number, display_name: string}[];
  children?: Dictionary<{OptionField}>;
}


export class Options {

  actions: {
    POST: OptionField,
    description: string,
    name: string,
  };
  parsers: string[];
  renders: string[];
}


export function getCookie(name: string): null | string {
  if (!document.cookie) {
    return null;
  }

  const xsrfCookies = document.cookie.split(';')
    .map(c => c.trim())
    .filter(c => c.startsWith(name + '='));

  if (xsrfCookies.length === 0) {
    return null;
  }

  return decodeURIComponent(xsrfCookies[0].split('=')[1]);
}


// tslint:disable-next-line:typedef
export function Api(serializer: any) {
  return (constructor: any) => {
    serializer.api_class = constructor;
  };
}


// @Injectable({
//     providedIn: 'root'
// })
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http: HttpClient;
  serializer: any;
  url: string;
  contentType: string;
  queryParams: any = {};
  // _options: Options;

  constructor(public injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  get(pk): Observable<any> {
    return this.retrieve(pk);
  }

  retrieve(pk): Observable<any> {
      return this.pipeHttp(this.http.get(this.getUrlDetail(pk)));
  }

  create(data): Observable<object> {
    return this.pipeHttp(this.http.post(this.getUrlList(), data, this.defaultHttpOptions()));
  }
  //
  // save(pk, data) {
  //     return this.pipeHttp(this.http.put(this.getUrlDetail(pk), data, this.defaultHttpOptions()));
  // }
  //
  // patch(pk, data) {
  //     return this.pipeHttp(this.http.patch(this.getUrlDetail(pk), data, this.defaultHttpOptions()));
  // }
  //
  // delete(pk) {
  //     return this.http.delete(this.getUrlDetail(pk), this.defaultHttpOptions());
  // }
  //
  defaultHttpOptions(): {headers: {}} {
    return {headers: {'X-CSRFToken': getCookie('csrftoken') || ''}};
  }

  pipeHttp(observable: Observable<object | object[] | ApiPage>,
           listMode: boolean = false): Observable<object | Page<SerializerService>> {
    return observable.pipe(
      map((resp: object | object[] | ApiPage) => this.convert(resp, listMode))
    );
  }

  convert(data: object | object[] | ApiPage, listMode: boolean): Page<SerializerService> | SerializerService {
    if (listMode) {
      const dataList = data as ApiPage;
      const results: object[] = dataList.results || (data as object[]);
      const page = new Page(this, results.map((item) => new this.serializer(this, item)));
      if (dataList.results) {
        // Is paginatinated in server
        page.hasNextPage = dataList.next !== null;
        page.hasPreviousPage = dataList.previous !== null;
        page.count = dataList.count;
        page.pagesCount = Math.floor(page.count / page.length);  // Todo: return in api or set in ApiService
      } else {
        // Results are not paginated
        page.count = (data as object[]).length;
      }
      return page;
    }
    return new this.serializer(this, data);
  }

  getUrlDetail(pk: string | number): string {
      return `${this.url}${pk}/`;
  }

  getUrlList(): string {
    return `${this.url}`;
  }
  //
  // orderBy(...orderList: string[]) {
  //     let order: string = orderList.join(',');
  //     let item = this.copy();
  //     item.setParams({'ordering': order});
  //     return item;
  // }
  //
  search(query) {
    let item = this.copy();
    item.setParams({'search': query});
    return item;
  }
  //
  // filter(params) {
  //     let item = this.copy();
  //     item.setParams(params);
  //     return item;
  // }
  //
  page(page: number = 1, page_size: number = undefined): any {
    const item = this.copy();
    item.setParams({page, page_size});
    return item;
  }
  //
  setParams(params): void {
    Object.keys(params).forEach((key) => (params[key] === undefined) && delete params[key]);
    this.queryParams = Object.assign(this.queryParams, params);
  }

  options(): Observable<Options> {
    return new Observable((observer) => {
      if (this.hasOptions) {
        observer.next(this.cachedOptions);
        // @ts-ignore
        this.constructor._options_observer = null;
      } else if (this.optionsObserver) {
        this.optionsObserver.subscribe((options: Options) => {
          observer.next(options);
        });
      } else {
        // @ts-ignore
        this.constructor._options_observer = this.http.options(this.url).pipe(shareReplay(1));
        this.optionsObserver.subscribe((options: Options) => {
          // @ts-ignore
          this.constructor._options = options;
          observer.next(options);
        });
      }
    });
  }

  get hasOptions(): boolean {
    return '_options' in this.constructor;
  }

  get cachedOptions(): Options | null {
    if (this.hasOptions) {
      // @ts-ignore
      return this.constructor._options;
    }
    return null;
  }

  private get optionsObserver(): Observable<Options> | null {
    // @ts-ignore
    return this.constructor._options_observer || null;
  }


  public list(): Observable<Page<any>> {
    return this.pipeHttp(this.http.get(this.getUrlList(), {params: this.queryParams}), true) as
      Observable<Page<any>>;
  }

  public all(): Observable<any> {
    return new Observable(subscriber => {
      function getNextPage(page): void {
        for (const item of page) {
          subscriber.next(item);
        }
        if (page.hasNextPage) {
          page.subscribe((nextPage: Page<any>) => getNextPage(nextPage));
        }
      }
      this.list().subscribe((page: Page<any>) => getNextPage(page));
    });
  }

  copy(): any {
    const api = new this['__proto__'].constructor(this.injector);
    api.queryParams = Object.assign({}, this.queryParams);
    return api;
  }
  //
  // isEqual(other) {
  //     return this.url == other.url && isEqual(this._queryParams, other._queryParams);
  // }
  //
  getOptionField(name): null | OptionField {
      if (!this.hasOptions) {
          return;
      }
      let data: OptionField | Dictionary<{OptionField}> = this.cachedOptions.actions.POST;
      name.split('__').forEach((item, i, array) => {
          data = data[item];
          if (data === undefined) {
              throw new Error(`Invalid item ${item} on ${name} query`);
          }
          if (data.type === 'nested object' && i !== array.length - 1) {
              data = data.children;
          }
      });
      return data;
  }
  //
  // getLabel(name) {
  //     return (this.getOptionField(name) || {})['label'];
  // }
  //
  // getHelpText(name) {
  //     return (this.getOptionField(name) || {})['help_text'];
  // }
  //
  // getChoices(name) {
  //     return (this.getOptionField(name) || {})['choices'];
  // }

  public getFormFields(fields = null): any {
    const data: DjangoFormlyField[] = [];
    if (fields === null) {
      fields = Object.keys(this.serializer.fields);
    }
    for (const field of fields) {
      data.push(new DjangoFormlyField(field, this));
    }
    return data;
  }

}
