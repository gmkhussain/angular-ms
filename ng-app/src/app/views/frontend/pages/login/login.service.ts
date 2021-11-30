import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _loginUrl = "http://localhost/projects/_rd/VueWP/wordpress/wp-json/jwt-auth/v1/token"
  constructor( private http: HttpClient ) { }

  loginUser( user ) {
    return this.http.post<any>(this._loginUrl, user)
  }
}
