import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Bond} from '../model/response/issued-bond.entity';

@Injectable({
  providedIn: 'root'
})
export class IssuerService {


  resourcePath: string = `${environment.baseUrl}/issuers`;

  constructor(private router: Router, private http: HttpClient) { }


  /**
   * Get all bonds issued by the issuer
   * @returns An array of issued bonds
   */
  getIssuedBonds() {
    return this.http.get<Bond[]>(`${this.resourcePath}/bonds`)
      .subscribe({
        next: (response) => {
          console.log('Bonds issued successfully:', response);
        },
        error: (error) => {
          console.error(`Error while fetching issued bonds: ${error}`);
        }
      })
  }

}
