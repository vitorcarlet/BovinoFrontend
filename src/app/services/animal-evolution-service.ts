import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimalEvolutionService {
  

  evolutions: any[] = []; // Certifique-se de especificar o tipo apropriado aqui
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getEvolutions(animalName:any){
    return this.httpClient.get(this.url +  "/evolution/get/"+animalName);
  }

  //essa função ta ERRADASSA, SO COPIEI A ANTERIOR 
  delete(id: any) {
    return this.httpClient.get(this.url +  "/evolution/get/"+id);
  }
}
