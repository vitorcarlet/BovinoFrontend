import { HttpClient } from '@angular/common/http';
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
    } catch (error) {
      console.error('Erro ao buscar animais:', error);
    }
  }
}