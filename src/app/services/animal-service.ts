import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Page } from '../interfaces/page-interface';
import { Animal } from '../interfaces/animal-interface';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  animals: Animal[] = []; // Certifique-se de especificar o tipo apropriado aqui
  page: Page | undefined;
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
    this.getAllAnimals();
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

  // async getAllAnimals(){
  //   try{
  //      this.httpClient.get<any>(this.url+"/animal/get").subscribe((response) =>{
  //       console.log(response);
  //       this.page = response;
  //     })
  //   } catch(error) {
  //     console.error('Erro ao buscar os animais', error);
  //   }
    
  // }

  async getAllAnimals(page = 1, size = 10) {
    try {
      const uri = `${this.url}/animal/get?page=${page}&size=${size}`;
      
      this.httpClient.get<any>(uri).subscribe((response) => {
        console.log(response);
        this.page = response;
      });
    } catch (error) {
      console.error('Erro ao buscar os animais', error);
    }
  }

  // getAnimals$ = (page: number = 0, size: number = 10): Observable<any> => 
  // this.httpClient.get<any>(`${this.url}/animal/get?page=${page}&size=${size}`);

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