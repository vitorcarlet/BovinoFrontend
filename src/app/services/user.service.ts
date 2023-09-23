import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  signup(data: any) {
    return this.httpClient.post(this.url + "/user/signup", data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  forgotPassword(data: any) {
    return this.httpClient.post(this.url + "/user/forgotPassword", data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  login(data: any) {
    return this.httpClient.post(this.url + "/user/login", data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  checkToken() {
    return this.httpClient.get(this.url + "/user/checkToken");
  }

  getId(data: any) {
    const dataJson = { "email" : data }; // Objeto Json
    //console.log(data);
  
    return this.httpClient.post(this.url + "/user/getId", dataJson, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  //getId(data: any) {
    //const dataJson = { "email" : data }; // Objeto Json
    //console.log(data);
  
   // return this.httpClient.post(this.url + "/user/getId", dataJson, {
    //  headers: new HttpHeaders().set('Content-type', 'application/json'),
   // }).pipe(
   //   switchMap((response: any) => {
    //    this.emailData = response;
   //     return this.emailData;
   //   })
   // );
  //}



  changePassword(data:any){
    return this.httpClient.post(this.url + "/user/changePassword", data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  getUsers(){
    return this.httpClient.get(this.url+"/user/get");
  }

  update(data:any){
    return this.httpClient.post(this.url+"/user/update",data,{
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }
}
