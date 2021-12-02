import { Component, OnInit } from '@angular/core';
// import { PostsService } from './posts.service'; // <--

import { HttpClient } from '@angular/common/http';

import { BaseService } from '../../../../services/base.service'
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})


export class PostsComponent {
 
  posts: any;
  constructor(
    public http: HttpClient,
    public baseService: BaseService
  ) { }

    
  
  // Service
  getPost() {
    
    console.log("getPost()... from baseService")

    this.baseService.all('wp/v2/posts').subscribe(
      res => {
        console.log("res", res )
        this.posts = res;
      },
      err => {
        console.log("err", err )
      }
    )

  }

  
  ngOnInit() {
    this.getPost() // call
  }


}
