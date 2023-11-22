import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimalPriceService {

  url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  getLastPrice(){

    
      const uri = `${this.url}/price/getLast`

      return this.httpClient.get<any>(uri).toPromise();
      
    
  }

  addPrice(price:any): Promise<any>{
    const uri = `${this.url}/price/add`;
    const dataJson = price;
    return this.httpClient.post(uri,dataJson, {
      headers: new HttpHeaders().set('Content-type','application/json')
    }).toPromise();
  }
}
