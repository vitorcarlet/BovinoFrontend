import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AnimalService } from 'src/app/services/animal-service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-last-animals-added',
  templateUrl: './last-animals-added.component.html',
  styleUrls: ['./last-animals-added.component.scss']
})
export class LastAnimalsAddedComponent implements OnInit {
  displayedColumns:string[] = ['name','actualWeight','birth'];
  dataSource:any;
  responseMessage:any;
  error:any;

  constructor(private animalService:AnimalService) { 
    
  }

  ngOnInit(): void {
    this.tableData();
  }

  //  async tableData(){
  //    await this.animalService.getAllAnimals(1,5).then((response:any)=>{
  //       this.dataSource = new MatTableDataSource(response.content);
  //   },(error:any)=>{
  //     console.log(error);
  //     if(error.error?.message){
  //       this.responseMessage = error.error?.message;
  //     }else{
  //       this.responseMessage = GlobalConstants.genericError;
  //     }
  //   })
  // }

  async tableData() {
    try {
      const response = await this.animalService.getAllAnimals(1, 5);
      this.dataSource = new MatTableDataSource(this.animalService.page?.content);
    } catch (error) {
      console.error(error);
    }
  }

  converterDataEmIdadeEmMeses(birth:any) {
    const dataNascimento = birth;
  
    if (dataNascimento) {
      // Converter a data de nascimento em milissegundos para um objeto Date
      const dataNascimentoDate = new Date(dataNascimento);
  
      // Calcular a diferença em meses entre a data de nascimento e a data atual
      const dataAtual = new Date();
      const diferencaMeses = (dataAtual.getFullYear() - dataNascimentoDate.getFullYear()) * 12 + (dataAtual.getMonth() - dataNascimentoDate.getMonth());
      const diferencaMesesString = diferencaMeses.toString();
  
      return diferencaMesesString;
    } else {
      return GlobalConstants.genericError;
    }
  }
  

}
