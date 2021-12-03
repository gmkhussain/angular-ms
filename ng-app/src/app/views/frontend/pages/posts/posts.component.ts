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

  formData = {
    title: '',
    status: 'publish'
  }

  searchData = {
    isSearched: false,
    searchString: ''
  }


  updateData = {
    title: ''
  }


  constructor(
    public http: HttpClient,
    public baseService: BaseService
  ) { }

  
  searchFunc() {
    console.log(this.searchData.searchString)
    this.searchPost( this.searchData.searchString )
  }
  
  // Service
  getPost() {
    
    console.log("getPost()... from baseService")

    this.baseService.all('wp/v2/posts').subscribe(
      res => {
        console.log("res", res )
        this.posts = res;
        this.searchData.isSearched = true
      },
      err => {
        console.log("err", err )
      }
    )

  }




    // Search Service
    searchPost( _str ) {
    
      console.log("searchPost()... from baseService")
  
      this.baseService.search("wp/v2/search", _str, 4, 1 ).subscribe(
        res => {
          console.log("res", res )
          this.posts = res;
        },
        err => {
          console.log("err", err )
        }
      )
  
    }




    createFunc() {
      console.log( "createFunc()..." )

      const _data = this.formData;

      this.baseService.add( "wp/v2/posts", _data ).subscribe(
        res => {
          console.log("res", res )
          this.posts = res;
          this.getPost() // Refresh data..
        },
        err => {
          console.log("err", err )
        }
      )
    }




    deleteFunc( _id ) {
      console.log("Id", _id )

      this.baseService.delete("wp/v2/posts", _id ).subscribe(
        res => {
          console.log("res", res )
          this.posts = res;
        },
        err => {
          console.log("err", err )
        }
      )

    }




    /*
     @ Edit Record
    */
    updateFunc( _data ) {
      console.log( _data )
      this.updateData = _data // Store Data to Form Inputs
    }

    saveUpdateFunc( _data ) {
      console.log( _data )

      this.baseService.edit("wp/v2/posts", _data.id, _data ).subscribe(
        res => {
          console.log("Updated:: res", res )
          this.posts = res;
          this.getPost() // Refresh Posts
        },
        err => {
          console.log("err", err )
        }
      )
    }
    /*
     @ ./Edit Record
    */


  
  ngOnInit() {
     this.getPost() // call
  }

}
