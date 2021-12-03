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



  private getHeaders(excludeToken?: boolean): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    if (!excludeToken) {
      headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem("token") );
    }

    return headers;
  }






  
  public all( url: string ) {
    return this.httpClient.get( `${environment.API_URL}${url}` );
  }

  public search( _url: string, _search: string, _prePage: number, _page: number ) {
    // /wp/v2/search
    return this.httpClient.get( `${environment.API_URL}${_url}?search=${_search}&per_page=${_prePage}&page=${_page}` );
  }

  add(url, payload ) {
    const headers = this.getHeaders();
    return this.httpClient.post( `${environment.API_URL}${url}`, payload , { headers: headers } );
  }

  delete(url, id) {
    const headers = this.getHeaders();
    return this.httpClient.delete( `${environment.API_URL}${url}/${id}`, { headers: headers });
  }

  edit( url, id, payload) {
    const headers = this.getHeaders();
    return this.httpClient.put( `${environment.API_URL}${url}/${id}`, payload ,{ headers: headers } );
  }

}
