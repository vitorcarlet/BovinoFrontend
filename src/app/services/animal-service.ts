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
    //this.getAllAnimals();
  }

  // async runAnimals() {
  //   try {
  //     const requisicao = await this.httpClient
  //       .get<any[]>(this.url + "/animal/get") // Defina o tipo genérico como any[] para a resposta ser um array
  //       .toPromise();

  //     this.animals = requisicao;
  //     console.log(requisicao);
  //     //console.log(requisicao);
  //   } catch (error) {
  //     console.error('Erro ao buscar animais:', error);
  //   }
  // }

  getAllAnimals(page: number, size: number, name: string): Observable<Page> {
    const uri = `${this.url}/animal/get?page=${page}&size=${size}&name=${name}`;
    return this.httpClient.get<Page>(uri);
  }

  getAllAnimalsWithoutName(page: number, size: number): Observable<Page> {
    const uri = `${this.url}/animal/get?page=${page}&size=${size}`;
    return this.httpClient.get<Page>(uri);
  }

  //  getAllAnimals(page:number, size:number, name:string) {
  //   try {
  //     const uri = `${this.url}/animal/get?page=${page}&size=${size}&name=${name}`;
      
  //     this.httpClient.get<Page>(uri).subscribe((response) => {
  //       console.log(response);
  //       this.page = response;
  //       return response;
  //     });
  //   } catch (error) {
  //     console.error('Erro ao buscar os animais', error);
  //   }
  // }

  //  getAllAnimals2(page:number, size:number) {
  //   try {
  //     const uri = `${this.url}/animal/get?page=${page}&size=${size}`;
      
  //     this.httpClient.get<Page>(uri).subscribe((response) => {
  //       console.log(response);
  //       this.page = response;
  //     });
  //   } catch (error) {
  //     console.error('Erro ao buscar os animais', error);
  //   }
  // }


  

  async deleteAnimal(animal:any){
    const dataJson = {  
      "name": animal.name,
      "race": animal.race,
      "birth": animal.birth,
      "actualWeight": animal.actualWeight,
      "ownerId": animal.ownerId.id
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