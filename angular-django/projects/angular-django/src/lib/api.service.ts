import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SerializerService} from './serializer.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {isString} from "util";
import {toTitleCase} from './form';
// import {Observable} from 'rxjs/Rx';
// import {isEqual} from "lodash";



export class PagedList extends Array {
    count: number;

    constructor(items?: Array<any>) {
        super(...items);
    }
}


export class Options {

    actions: {
        POST: {},
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



    // get(pk) {
    //     return this.pipeHttp(this.http.get(this.getUrlDetail(pk)));
    // }
    //
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

    pipeHttp(observable: Observable<object>, listMode: boolean = false): Observable<object> {
        return observable.pipe(
            map((resp) => this.convert(resp, listMode))
        );
    }
    //
    convert(data, listMode: boolean): object[] | object {
        if (listMode) {
            let items = data.results || data;
            items = new PagedList(items.map((item) => new this.serializer(this, item)));
            items.count = data.count || items.length;
            items.pagesCount = Math.floor(items.count / items.length);  // Todo: return in api or set in ApiService
            return items;
        }
        return new this.serializer(this, data);
    }
    //
    // getUrlDetail(pk) {
    //     return `${this.url}${pk}/`;
    // }
    //
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
    //
    // options() {
    //
    //     return Observable.create((observer) => {
    //         // if(this._options) {
    //         //     observer.next(this._options);
    //         // } else {
    //         //     this.http.options(this.url).subscribe((options: Options) => {
    //         //         this._options = options;
    //         //         observer.next(options);
    //         //     });
    //         // }
    //         if(this.constructor['_options']) {
    //             observer.next(this.constructor['_options']);
    //         } else {
    //             this.http.options(this.url).subscribe((options: Options) => {
    //                 this.constructor['_options'] = options;
    //                 observer.next(options);
    //             });
    //         }
    //     });
    // }
    //
    public list(): Observable<object | object[]> {
        return this.pipeHttp(this.http.get(this.getUrlList(), {params: this.queryParams}), true);
    }
    //
    copy(): any {
        let api = new this['__proto__'].constructor(this.injector);
        api.queryParams = Object.assign({}, this.queryParams);
        return api;
    }
    //
    // isEqual(other) {
    //     return this.url == other.url && isEqual(this._queryParams, other._queryParams);
    // }
    //
    // getOptionField(name) {
    //     if(!this.constructor['_options']) {
    //         return
    //     }
    //     let data = this.constructor['_options'].actions.POST;
    //     name.split('__').forEach((item, i, array) => {
    //         data = data[item];
    //         if(data === undefined) {
    //             throw new Error(`Invalid item ${item} on ${name} query`);
    //         }
    //         if(data['type'] == 'nested object' && i !== array.length - 1) {
    //             data = data['children'];
    //         }
    //     });
    //     return data;
    // }
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
    const data: any = [];
    for (const field of fields) {
      let item: any;
      if (typeof field === 'string') {
        item = {
          key: field
        };
      }else if (Array.isArray(field)) {
        item = {
          fieldGroupClassName: 'display-flex',
          fieldGroup: this.getFormFields(field),
          // type: 'flex-layout',
          // templateOptions: {
          //   fxLayout: 'row',
          // },
        };
      } else {
        item = field;
      }
      if ( item.key && !item.type ) {
        item.type = 'input';  // Get type for input here
      }
      if ( item.key && !item.className ) {
        item.className = 'flex-1';  // Get type for input here
      }
      if ( item.key && !item.templateOptions ) {
        item.templateOptions = {};
      }
      if ( item.key && !item.templateOptions.label ) {
        item.templateOptions.label = toTitleCase(item.key);
      }
      if ( item.key && !item.templateOptions.placeholder ) {
        item.templateOptions.placeholder = `Enter ${item.templateOptions.label.toLowerCase()}`;
      }
      data.push(item);
    }
    return data;
  }

}
