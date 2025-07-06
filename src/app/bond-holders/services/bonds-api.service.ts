import { Injectable } from '@angular/core';
import { BaseApiService } from '../../shared/services/base-api.service';
import {Bond} from '../model/bond.entity';
import {catchError, Observable, retry} from 'rxjs';
import {CashFlow} from '../model/cash-flow.entity';
import {Router} from '@angular/router';
import {BondResult} from '../model/bond-result.entity';
import {HiredBonds} from '../../issuer/pages/hired-bonds/hired-bonds';
import {HiredBond} from '../../issuer/model/hiredBond.entity';

@Injectable({
  providedIn: 'root'
})
export class BondsApiService extends BaseApiService<Bond> {

  constructor(private router: Router) {
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

  getBondById(id: number): Observable<Bond> {
    return this.http.get<Bond>(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updatePeriodGraceByBondIdAndPeriodNumber(bondId: number , periodNumber: number, gracePeriod: string): Observable<any>{
    return this.http.patch(`${this.resourcePath()}/${bondId}/cashFlows/${periodNumber}/gracePeriod`,  `"${gracePeriod}"` , this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getAllBondsOfBondHolder(): Observable<Bond[]> {
    return this.http.get<Bond[]>(`http://localhost:8080/api/v1/bond-holders/bonds`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllBondsOfIssuer(): Observable<Bond[]> {
    return this.http.get<Bond[]>(`http://localhost:8080/api/v1/issuers/bonds`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllHiredBondsOfIssuer(): Observable<HiredBond[]> {
    return this.http.get<HiredBond[]>(`http://localhost:8080/api/v1/issuers/bonds/hired`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getBondResultById(id: number): Observable<BondResult> {
    return this.http.get<BondResult>(`${this.resourcePath()}/${id}/result`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
