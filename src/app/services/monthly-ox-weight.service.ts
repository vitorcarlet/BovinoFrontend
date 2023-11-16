import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonthlyOxWeightService {

  url = environment.apiUrl

  constructor(private httpClient:HttpClient) { }

   getMonthlOxWeight(){
    return this.httpClient.get(this.url+"/monthlyOxWeight/get")
  }

}
