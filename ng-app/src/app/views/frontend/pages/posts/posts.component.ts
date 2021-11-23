import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service'; // <--

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})


export class PostsComponent {
 
  posts: any;
  constructor(public http: HttpClient) {
    // Rest API Calling
    this.http.get('https://localhost/projects/_rd/VueWP/wordpress/wp-json/wp/v2/posts').subscribe(data => {
      this.posts = data;
      console.log("DATA:: ", this.posts );
    });
  }

}
