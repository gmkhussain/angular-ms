// NOT USING NOW
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  
  private REST_API_SERVER = "https://localhost/projects/_rd/VueWP/wordpress/wp-json/wp/v2/posts";

  constructor(private httpClient: HttpClient) { }

  public getRequest(){
    console.log( "REST", this.httpClient.get(this.REST_API_SERVER) )
    return this.httpClient.get(this.REST_API_SERVER);
  }
 

}


