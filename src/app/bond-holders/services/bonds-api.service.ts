import { Injectable } from '@angular/core';
import { BaseApiService } from '../../shared/services/base-api.service';
import {Bond} from '../model/bond.entity';
import {catchError, Observable, retry} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BondsApiService extends BaseApiService<Bond> {

  constructor() {
    super();
    this.resourceEndPoint = '/bonds';
  }

  getAllBonds(): Observable<Bond[]> {
    return this.http.get<Bond[]>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
