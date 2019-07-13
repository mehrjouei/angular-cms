import { Injectable } from '@angular/core';
import { Address, State, City } from '../viewModels/address.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private states$: BehaviorSubject<State[]>;
  private startGettingStates = { value: false };

  constructor(
    private http: HttpClient,

  ) {
    this.states$ = new BehaviorSubject<any>(null);
  }
  list(): Promise<any> {
    return this.http.get(environment.LOCATION_Url + "/Address")
      .toPromise()
  }
  create(address: Address): Promise<any> {
    return this.http.post(environment.LOCATION_Url + "/Address", address)
      .toPromise()
  }
  update(address: Address): Promise<any> {
    return this.http.put(environment.LOCATION_Url + "/Address", address)
      .toPromise()
  }
  remove(addressId): Promise<any> {
    return this.http.delete(environment.LOCATION_Url + `/Address/${addressId}`)
      .toPromise()
  }
  getSates(): Observable<State[]> {
    if (!this.startGettingStates.value) {
      this.startGettingStates.value = true;
      this.http.get(environment.LOCATION_Url + "/State")
        .subscribe((states: State[]) => {
          this.states$.next(states);
        })
    }
    return this.states$.asObservable();
  }
  getCity(stateId): Promise<City[]> {
    return this.http.get<City[]>(environment.LOCATION_Url + `/City?stateId=${stateId}`).toPromise()
  }
}
