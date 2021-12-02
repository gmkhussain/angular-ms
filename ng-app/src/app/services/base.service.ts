import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BaseService {

  constructor(
    private httpClient: HttpClient
  ) { }
  
  public all( url: string ) {
    return this.httpClient.get( `${environment.API_URL}${url}` );
  }

}
