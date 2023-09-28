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


  addNewWeight(evolutionObj:any){
    const dataJson = {  
      "id": evolutionObj.animalId,
      "weight": evolutionObj.weight,
      "date": evolutionObj.date
      
  };
    return this.httpClient.post(this.url +"/animal/addNewWeight",dataJson,{
      headers: new HttpHeaders().set('Content-type','application/json')
    });
  }
  

  getEvolutions(animalName:any){
    return this.httpClient.get(this.url +"/evolution/get/"+animalName);
  }

  delete(id: any) {
    return this.httpClient.post(this.url +"/evolution/remove/"+id,null);
  }

  edit(evolutionObj:any){
    let dataJson = evolutionObj;
    return this.httpClient.post(this.url +"/evolution/edit",dataJson,{
      headers: new HttpHeaders().set('Content-type','application/json')
    });
  }

  add(evolutionObj:any){
    let dataJson = evolutionObj;
    return this.httpClient.post(this.url +"/animal/addNewWeight",dataJson,{
      headers: new HttpHeaders().set('Content-type','application/json')
    });
  }
}



