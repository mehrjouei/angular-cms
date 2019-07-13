import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InsuranceType } from '../viewModels/insuranceType.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  constructor(private httpService: HttpClient) { }

  getInsuranceTypes(): Promise<InsuranceType[]> {
    return this.httpService.get<InsuranceType[]>(environment.REVIEW_Url + '/insurancetype')
      .toPromise();
  }
}
