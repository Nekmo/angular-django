import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, shareReplay} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {DjangoFormlyField, DjangoFormlyFilterField} from './form';
import {SerializerService} from './serializer.service';
import {getCookie, getNestedDictionary} from './utils';
import {Dictionary} from './utility-types';


/**
 *  Page returned by apì server
 */
interface ApiPage {
  count: number;
  page_size?: number;
  next: string | null;
  previous: string | null;
  results: object[];
}

/**
 *  POST Options returned by api server. It has info about serializer.
 */
export class OptionField {
  type: string;
  required: boolean;
  // tslint:disable-next-line:variable-name
  read_only: boolean;
  label: string;
  choices?: {value: string | number, display_name: string}[];
  children?: Dictionary<OptionField>;
}


export interface OptionsFilter {
  name: string;
  in: string;
  required: boolean;
  schema: {
    type: string;
  };
}


/**
 *  Options returned by api server.
 */
export class Options {

  actions: {
    POST: Dictionary<OptionField>,
    description: string,
    name: string,
  };
  filters: OptionsFilter[];
  parsers: string[];
  renders: string[];

  constructor(options: any) {
    this.actions = options.actions;
    this.parsers = options.parsers;
    this.renders = options.renders;
    this.filters = options.filters;
  }

  get optionsField(): Dictionary<OptionField> {
    return this.actions.POST;
  }

  getField(fieldName: string): OptionField {
    const optionsField: OptionField | Dictionary<OptionField> = this.optionsField;
    return (getNestedDictionary(optionsField, fieldName) as OptionField);
  }

  getDisplay(fieldName: string, value: any): string {
    return this.getField(fieldName).choices.find(
      (x) => x.value === value).display_name;
  }
}


/**
 *  Iterable page. It has methods to get the current and next page.
 */
export class Page<T> extends Array<T> {
  count: number;
  pagesCount: number | null = null;
  pagesSize: number | null = null;
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

/**
 * set serializer in Api class
 */
// tslint:disable-next-line:typedef
export function Api(serializer: any) {
  return (constructor: any) => {
    serializer.apiClass = constructor;
  };
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http: HttpClient;
  serializer: any;
  url: string;
  queryParams: any = {};

  constructor(public injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  // Common api methods

  /**
   * Alias for retrieve. Retrieve a element by primary key.
   *
   * @param pk: element primary key
   */
  get(pk): Observable<any> {
    return this.retrieve(pk);
  }

  /**
   * Retrieve a element by primary key.
   *
   * @param pk: element primary key
   */
  retrieve(pk): Observable<any> {
      return this.pipeHttp(this.http.get(this.getUrlDetail(pk)));
  }

  /**
   * Create a element using data
   *
   * @param data: a object with item parameters
   */
  create(data: {}): Observable<any> {
    return this.pipeHttp(this.http.post(this.getUrlList(), data, this.defaultHttpOptions()));
  }

  /**
   * List elements with api filters. Only one page is returned, use `page()` for change the
   * api page.
   */
  list(): Observable<Page<any>> {
    return this.pipeHttp(this.http.get(this.getUrlList(), {params: this.queryParams}), true) as
      Observable<Page<any>>;
  }

  /**
   * List elements with api filters
   */
  all(): Observable<any> {
    return new Observable(subscriber => {
      function getNextPage(page): void {
        for (const item of page) {
          subscriber.next(item);
        }
        if (page.hasNextPage) {
          page.next().subscribe((nextPage: Page<any>) => getNextPage(nextPage));
        } else {
          subscriber.complete();
        }
      }
      this.list().subscribe((page: Page<any>) => getNextPage(page));
    });
  }

  /**
   * Get options from server. It has information about the api and the serializer.
   * Options are cached.
   */
  options(): Observable<Options> {  // Maybe use a Subject
    return new Observable((observer) => {
      if (this.hasOptions) {
        observer.next(this.cachedOptions);
        (this.constructor as any)._optionsObserver = null;
      } else if (this.optionsObserver) {
        this.optionsObserver.subscribe((options: Options) => {
          observer.next(options);
        });
      } else {
        (this.constructor as any)._optionsObserver = this.http.options(this.url).pipe(
          shareReplay(1),
          map(x => new Options(x))
        );
        this.optionsObserver.subscribe((options: Options) => {
          (this.constructor as any)._options = options;
          observer.next(options);
        });
      }
    });
  }

  // Methods for work with serializers by primary key

  /**
   * Update a object by its id using data. All parameters are overwrite using
   * PUT method.
   *
   * @param pk: object primary key.
   * @param data: parameters for overwrite.
   */
  update(pk: number | string, data: Dictionary<any>): Observable<any> {
      return this.pipeHttp(this.http.patch(this.getUrlDetail(pk), data, this.defaultHttpOptions()));
  }

  /**
   * Update a object by its id using data. All parameters are overwrite using
   * PATCH method.
   *
   * @param pk: object primary key.
   * @param data: parameters for overwrite.
   */
  partial_update(pk: number | string, data: Dictionary<any>): Observable<any> {
      return this.pipeHttp(this.http.put(this.getUrlDetail(pk), data, this.defaultHttpOptions()));
  }

  /**
   * Delete a object by its id.
   *
   * @param pk: object primary key.
   */
  delete(pk: number | string): Observable<any> {
      return this.http.delete(this.getUrlDetail(pk), this.defaultHttpOptions());
  }


  /**
   * Change the sort order for listings
   * @param orderList: column names
   */
  orderBy(...orderList: string[]): ApiService {
      const item = this.copy();
      if (!orderList.length || !orderList[0]) {
        return item;
      }
      const order: string = orderList.join(',');
      item.setParams({ordering: order});
      return item;
  }

  /**
   * Search in list using a query term
   * @param query: search term
   */
  search(query: string): ApiService {
    const apiService = this.copy();
    apiService.setParams({search: query});
    return apiService;
  }

  /**
   * Filter on the listings using the set parameters
   * @param params: parameters dictionary
   */
  filter(params: Dictionary<string | number>): ApiService {
      const item = this.copy();
      item.setParams(params);
      return item;
  }

  /**
   * Set page for list
   * @param page: page number in list
   * @param pageSize: page size for pages returned by api
   */
  page(page: number = 1, pageSize: number | null = null): any {
    const item = this.copy();
    if (pageSize === null) {
      pageSize = undefined;
    }
    item.setParams({page, page_size: pageSize});
    return item;
  }

  // Utils for work with this class

  /**
   * Return a new apiService for not to change the original instance
   */
  copy(): any {
    const api = new this['__proto__'].constructor(this.injector);
    api.queryParams = Object.assign({}, this.queryParams);
    return api;
  }

  /**
   * Compare two ApiService instances
   * @param other: other ApiService
   */
  isEqual(other: ApiService): boolean {
      return this.url === other.url && JSON.stringify(this.queryParams) === JSON.stringify(other.queryParams);
  }

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

  public getFilterFormFields(fields = null): any {
    const data: DjangoFormlyFilterField[] = [];
    if (fields === null) {
      fields = this.cachedOptions.filters.map((x) => x.name);
    }
    for (const field of fields) {
      data.push(new DjangoFormlyFilterField(field, this));
    }
    return data;
  }

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
        const size: number = dataList.page_size || page.length;
        page.pagesSize = size;
        page.pagesCount = Math.floor(page.count / size);
      } else {
        // Results are not paginated
        page.count = (data as object[]).length;
      }
      return page;
    }
    return new this.serializer(this, data);
  }

  setParams(params): void {
    Object.keys(params).forEach((key) => (params[key] === undefined) && delete params[key]);
    this.queryParams = Object.assign(this.queryParams, params);
  }

  get hasOptions(): boolean {
    return '_options' in this.constructor;
  }

  get cachedOptions(): Options | null {
    if (this.hasOptions) {
      return (this.constructor as any)._options;
    }
    return null;
  }

  private get optionsObserver(): Observable<Options> | null {
    return (this.constructor as any)._optionsObserver || null;
  }

  getOptionField(name): null | OptionField {
    if (!this.hasOptions) {
      return;
    }
    let data: OptionField | Dictionary<OptionField> = this.cachedOptions.optionsField;
    data = getNestedDictionary(data, name);
    return (data as unknown as OptionField);
  }

  getUrlDetail(pk: string | number): string {
      return `${this.url}${pk}/`;
  }

  getUrlList(): string {
    return `${this.url}`;
  }

}
