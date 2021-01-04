import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';

import {Observable, EMPTY, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  durationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          this.logError(`An error occurred: ${response.error.message}`);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          this.logError(`Backend returned code ${response.status}, body was: ${response.error}`);
        }

        return throwError(response);
      })
    );
  }

  logError(message): void {
    console.error(message);
    this.openSnackBar(message, 'Dismiss');
  }

  openSnackBar(message, action): void {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
