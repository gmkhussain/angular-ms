import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private REST_API_SERVER = "https://localhost/projects/_rd/VueWP/wordpress/wp-json/wp/v2/users";

  constructor(private httpClient: HttpClient) { }

  // public sendGetRequest() {
  //   return this.httpClient.get(this.REST_API_SERVER);
  // }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER).pipe(catchError(this.handleError));
  }

}