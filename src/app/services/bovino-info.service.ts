import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import jwt_decode from 'jwt-decode';
import { GlobalConstants } from '../shared/global-constants';
import { FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BovinoInfoService {
  url = environment.apiUrl;
  user: any = '';
  id: any = '';
  emailForm: any = FormGroup;
  emailData:any;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  async getUserId() {
    const token: any = localStorage.getItem('token');
    var tokenPayload: any;
    try {
      tokenPayload = jwt_decode(token);
    } catch (err) {
      localStorage.clear();
      return GlobalConstants.genericError + 'erro do bovinoinfo';
    }
  
    this.user = tokenPayload.sub;
    
    
    const data = this.user;
  
    try {
      this.emailData =  await this.userService.getId(data).toPromise();
  
      return this.emailData;
    } catch (error) {
      this.emailData = GlobalConstants.genericError;
      console.error(error); // Log any errors for debugging
      return this.emailData;
    }
  }

  async getUserIdAsync() {
    const resultado = await this.getUserId();
    console.log(resultado)+"22222"; // Agora você terá acesso ao valor resolvido, que deve ser 7 ou outro valor que corresponda à resolução da sua Promise.
    return resultado;
  }
  

  async getOxQuantity() {
    const id = await this.getUserIdAsync();
    console.log(id + "111111111");
    return this.httpClient.get(this.url + '/dashboard/count/' + id);
  }
  async getOxMediumWeight() {
    const id = await this.getUserIdAsync();
    return this.httpClient.get(this.url + '/dashboard/weight/' + id);
  }
}
