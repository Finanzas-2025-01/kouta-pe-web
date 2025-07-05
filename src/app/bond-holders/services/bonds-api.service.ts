import { Injectable } from '@angular/core';
import { BaseApiService } from '../../shared/services/base-api.service';
import {Bond} from '../model/bond.entity';
import {catchError, Observable, retry} from 'rxjs';
import {CashFlow} from '../model/cash-flow.entity';

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

  getBondCashflowById(id:number) : Observable<CashFlow[]>{
    return this.http.get<CashFlow[]>(`${this.resourcePath()}/${id}/cashFlows`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllBondsOfBondHolder(): Observable<Bond[]> {
    return this.http.get<Bond[]>(`http://localhost:8080/api/v1/bond-holders/bonds`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }


  getAllBondsOfIssuer(): Observable<Bond[]> {
    return this.http.get<Bond[]>(`http://localhost:8080/api/v1/issuers/bonds`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
