import NewCommandModule from '@angular/cli/src/commands/new/cli';
import {HttpBackend, HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, Observable, retry, throwError} from 'rxjs';
import {environment} from "../../../environments/environment";

export abstract class BaseApiService<T> {
  /** HTTP headers configuration for JSON communication */
  protected httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

  /** Base URL for the server API */
  protected baseUrl: string = `${environment.baseUrl}`;

  protected resourceEndPoint: string = '/resources';

  /** HTTP client for making API request */
  protected http: HttpClient = inject(HttpClient);

  protected resourcePath(): string {
    return `${this.baseUrl}${this.resourceEndPoint}`;
  }

  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred:, ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


}
