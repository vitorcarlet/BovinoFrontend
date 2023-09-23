import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimalTableService {

  url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  getAnimals(){
    return this.httpClient.get(this.url+"/animal/get");
  }
}
