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

  public search( _url: string, _search: string, _prePage: number, _page: number ) {
    // /wp/v2/search
    return this.httpClient.get( `${environment.API_URL}${_url}?search=${_search}&per_page=${_prePage}&page=${_page}` );
  }

  // add(url, payload, CONFIG) {
  //   return this.httpClient.post( `${environment.API_URL}${url}`, payload , CONFIG );
  // }

  // delete(id, url, CONFIG) {
  //   return this.httpClient.post( `${environment.API_URL}${url}${id}`, {}, CONFIG );
  // }

  // edit(payload, id, url, CONFIG) {
  //   return this.httpClient.post( `${environment.API_URL}${url}${id}`, payload, CONFIG );
  // }

}
