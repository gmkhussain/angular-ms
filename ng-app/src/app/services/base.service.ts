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





  private getHeadersForm(excludeToken?: boolean): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('accept', 'application/json');
    // headers = headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    //  headers = headers.append('Content-Type', 'multipart/form-data;boundary='+Math.random() );
    
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


  sendEmail( payload ) {
    console.log("Email>>", payload )
    const _formid = 6;
    const headers = this.getHeadersForm();
    
    return this.httpClient.post( `${environment.API_URL}contact-form-7/v1/contact-forms/${_formid}/feedback`, payload , { headers: headers } );
  }





  private CK = 'ck_e23d2e0cdfced671b30dd3629332bfd1a9a3d64f';
  private CS = 'cs_efc1cfbaf33f90dc5a95f8e59129c4d5c5471995';

  public allProduct( url: string ) {
    
    let FULL_URL = `${environment.API_URL}${url}?consumer_key=${this.CK}&consumer_secret=${this.CS}`;
        console.log("URL", FULL_URL )

    return this.httpClient.get( FULL_URL );
  }



  public productListing( url, _options:{ _perPageLimit: number , _currentPageNumber: number } ) {
    
    let FULL_URL = `${environment.API_URL}${url}?consumer_key=${this.CK}&consumer_secret=${this.CS}&per_page=${_options._perPageLimit}&page=${_options._currentPageNumber}`;

    console.log("URL", FULL_URL )

    return this.httpClient.get( FULL_URL );
  }



  public productDetail( url , _id: number ) {

    let FULL_URL = `${environment.API_URL}${url}/${_id}/?consumer_key=${this.CK}&consumer_secret=${this.CS}`;
        console.log("URL", FULL_URL )

    return this.httpClient.get( FULL_URL );
   
  }


}
