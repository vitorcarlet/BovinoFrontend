import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  animals: any[] = []; // Certifique-se de especificar o tipo apropriado aqui
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
    this.runAnimals();
  }

  async runAnimals() {
    try {
      const requisicao = await this.httpClient
        .get<any[]>(this.url + "/animal/get") // Defina o tipo genérico como any[] para a resposta ser um array
        .toPromise();

      this.animals = requisicao;
      console.log(requisicao);
      //console.log(requisicao);
    } catch (error) {
      console.error('Erro ao buscar animais:', error);
    }
  }

  async deleteAnimal(animal:any){
    const dataJson = {  
      "name": animal.name,
      "race": animal.race,
      "birth": animal.birth,
      "actualWeight": animal.actualWeight,
      "ownerId": animal.ownerId
  };

  console.log(dataJson);

    return this.httpClient.post(this.url + "/animal/remove", dataJson, {
      headers: new HttpHeaders().set('Content-type','application/json')
    });
  }

   update(data:any){
    return this.httpClient.post(this.url +
      "/animal/update",data,{
        headers:new HttpHeaders().set('Content-type',"application/json")
      });
  }

  add(animal:any){
    var dataJson = animal;
    return this.httpClient.post(this.url + "/animal/add", dataJson, {
      headers: new HttpHeaders().set('Content-type','application/json')
    });
  }

}