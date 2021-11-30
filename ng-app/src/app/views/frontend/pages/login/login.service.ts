import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private _apiUrl = environment.API_URL
  private _loginUrl = "jwt-auth/v1/token"
  
  constructor( private http: HttpClient ) { }

  loginUser( user ) {
    
    console.log(`${this._apiUrl}${this._loginUrl}`);

    return this.http.post<any>(`${this._apiUrl}${this._loginUrl}`, user)
  }


}
