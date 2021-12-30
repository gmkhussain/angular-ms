## Install Angular CLI
- ```npm install -g @angular/cli```



## Create App
- ```ng new my-app-name```



## Run App
- ```ng serve```



## Routing

// app-routing.module.ts
```js
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/frontend/pages/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

- Visit ```http://localhost:4200/home```







## Add Header 
- Create Header ```ng g c header```

// app.component.html
```js
<app-header></app-header>
<router-outlet></router-outlet>
```


// header.component.html
```js
<header>
    <div class="container">
        <a routerLink="/home">Home</a>
        <a routerLink="/posts">Posts</a>
    </div>
</header>
```



## Accordion Collapse

```js
  public currentRowExpend: string = '';
  public currentRowBtnStatus: boolean = false;
  
  rowExpendChange(_id) {
    return 'accordion_'+_id
  }

  accordionToggle( _id: any ) {

    let selectedRow = 'accordion_'+_id
    
    if(this.currentRowExpend == selectedRow) {
      this.currentRowExpend = ''
    } else {
      this.currentRowExpend = selectedRow
    }

    this.currentRowBtnStatus = !this.currentRowBtnStatus;  
  }
```





### Fragment and accordion

```html
<ng-container *ngFor="let post of posts">
      <tr>
        <td>{{post.id}}</td>
        <td>{{post.title.rendered}}</td>
        <td>{{post.content.rendered}}</td>
        <td>
          <a class="btn-sm" routerLink='/post/{{post.id}}'>View</a>
          <a class="btn-sm" (click)="deleteFunc(post.id)">X</a>
          <a class="btn-sm" (click)="updateFunc(post)">Edit</a>

          <span class="btn-collapse fa fa-angle-right"
                [class.open]="currentRowExpend == rowExpendChange(post.id)"
                [id]="post.id"                                      
                (click)="accordionToggle(post.id)">Quick View</span>
          
        </td>
      </tr>
      <tr *ngIf="currentRowExpend == rowExpendChange(post.id)">
        <td colspan="8">
          <p>Date: {{post.date}}</p>
          <p>Status: {{post.status}}</p>              
        </td>
      </tr>
</ng-container>
```






## Tabs

#### src/app/views/frontend/pages/home/home.component.html
```js
<div class="tab">
    <ul>
      <li id="mission" (click)="tabChange('mission')">Our Mission</li>
      <li id="vision" (click)="tabChange('vision')">Our Vision</li>
      <li id="about" (click)="tabChange('about')">About</li>
    </ul>
    <div class="content">
      <div class="content-value" [hidden]="currentTab != 'mission'">
        <p>Mission content...</p>
      </div>
      <div class="content-value" [hidden]="currentTab != 'vision'">
        <p>vision content...</p>
      </div>
      <div class="content-value" [hidden]="currentTab != 'about'">
        <p>about content...</p>
      </div>
    </div>
</div>
```


##### is the equivalent of v-show in Vue.js
```js
[hidden]="currentTab != 'mission'"
```


OR use if statment...

```js
*ngIf="currentTab == 'mission'"
```


















## Fetch Post Data

// posts.component.ts
```js
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
    this.http.get('your-project.url/wordpress/wp-json/wp/v2/posts').subscribe(data => {
      this.posts = data;
      console.log("DATA:: ", this.posts );
    });
  }
}
```


#### TypeScript Config | Typescript: TS7006: Parameter 'xxx' implicitly has an 'any' type
// tsconfig.json
```js
"compilerOptions": {
    //...
    "noImplicitAny": false,
    //...
  },
```








## Bootstrap

- ```npm install bootstrap --save```
- ```npm install @popperjs/core --save```
- ```npm i node-sass --save```

// angular.json
```js
    "styles": [
      "src/scss/my-styles.scss",
      "./node_modules/bootstrap/dist/css/bootstrap.min.css"
    ],
    "scripts": [
      "./node_modules/@popperjs/core/dist/umd/popper.min.js",
      "./node_modules/bootstrap/dist/js/bootstrap.min.js"
    ]
```


// package.json
```js
  "scripts": {
    // ...
    "sass": "node-sass -w scss/ -o dist/css/ --recursive"
    // ...
  }
```











## Layouts 
- Multiple layouts for different pages

- goto ```src/app/views/frontend/layouts```
- ```ng g c default-layout```

// default-layout.component.html
```js
  <p>Default Layout with header</p>
  <app-header></app-header>
  <router-outlet></router-outlet>
```



- ```ng g c auth-layout```

// auth-layout.component.html
```js
  <p>auth-layout without header!</p>
  <router-outlet></router-outlet>
```




- Remove header from ```app.component.html```
// app.component.html
```js
  <router-outlet></router-outlet>
```




// app-routing.module.ts
```js
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './views/frontend/layouts/default-layout/default-layout.component';

import { HomeComponent } from './views/frontend/pages/home/home.component';
import { PostsComponent } from './views/frontend/pages/posts/posts.component';
import { PostSingleComponent } from './views/frontend/pages/post-single/post-single.component';


import { AuthLayoutComponent } from './views/frontend/layouts/auth-layout/auth-layout.component';

import { LoginComponent } from './views/frontend/pages/login/login.component';



const routes: Routes = [
    // Default Layout Routes
    {
      path: '',
      component: DefaultLayoutComponent, 
      children: [
        { path: '', component: HomeComponent },
        { path: 'posts', component: PostsComponent },
        { path: "post/:id", component: PostSingleComponent }
      ]
    },
    // Auth Layout Routes
    {
      path: 'login',
      component: AuthLayoutComponent, 
      children: [
        { path: '', component: LoginComponent },
      ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
```











# Login
- Create Login component ```ng g c login```

- import ```FormsModule``` in App

#### src/app/app.module.ts
```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms' //<-- Login Form

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './views/frontend/pages/home/home.component';
import { HeaderComponent } from './views/frontend/layouts/header/header.component';
import { PostsComponent } from './views/frontend/pages/posts/posts.component';
import { PostSingleComponent } from './views/frontend/pages/post-single/post-single.component';
import { DefaultLayoutComponent } from './views/frontend/layouts/default-layout/default-layout.component';
import { AuthLayoutComponent } from './views/frontend/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './views/frontend/pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PostsComponent,
    PostSingleComponent,
    DefaultLayoutComponent,
    AuthLayoutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // <-- Login Form
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```


#### src/app/views/frontend/pages/login/login.html
```js
<section class="login-page">
    <div class="container">
        <p>login works!</p>
            <form>
                <div class="form-group">
                    <label>Username</label>
                    <input
                        [(ngModel)]="loginUserData.username"
                        name="username" 
                        type="text"
                        class="form-control"
                    />
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input
                        [(ngModel)]="loginUserData.password"
                        name="password"
                        type="password"
                        class="form-control"
                        />
                </div>
                <div class="form-group mt-4">
                    <button
                        class="btn btn-primary"
                        type="button"
                        (click)="loginUser()"
                        >Login</button>
                </div>
                <p>{{loginUserData.loginFeedback}}</p>
            </form>

    </div>
</section>
```

#### src/app/views/frontend/pages/login/login.component.ts
```js
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserData = { // <---
    username: '',
    password: ''
  }
  constructor() { }

  ngOnInit(): void {

  }

  loginUser() {
    console.log( this.loginUserData ) // <---
  }
}
```




#### Create login services
- Goto ```src/app/frontend/pages/login```
- ```ng g s```



##### login.services.ts
```js
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
```











##### login.component.ts
```js
import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service'

import { Router } from '@angular/router'; //<-- For Redirect

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserData = {
    username: '',
    password: '',
    loginFeedback: ''
  }
  
  constructor(
      private _login: LoginService,
      private router: Router //<-- For Redirect
    ) { }

  ngOnInit(): void {

  }

  loginUser() {
    console.log( this.loginUserData )
    // Sending Data to Api
    this._login.loginUser( this.loginUserData ).subscribe(
      res => {
        console.log( res );

        localStorage.setItem("token", res.token)
        console.log( "Token::", localStorage.getItem("token") )
        
        this.router.navigate(['/admin/dashboard']); //<-- Redirecting to dashboard

      },
      err => {
        console.log("Login Err", err )
        this.loginUserData.loginFeedback = "Try again..."
     }
    )
  }
}
```




###### Create dashboard page

- Goto ```src/app/views/backend/pages/```

- ```ng g c dashboard```








### Check Authentication status on Dashboard URL

##### dashboard.components.ts
```js
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'; //<-- For Redirect

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router //<-- For Redirect
  ) { }

  ngOnInit(): void {

    // If Token doesnt exist...
    // Redirect to home URL...
    if( localStorage.getItem("token")?.length === 0 ) { // <--- Here
      this.router.navigate(['/']);
      console.log(localStorage.getItem("token"))
    }

  }
}
```











## Config URLs for API Endpoints

##### environment.ts
```js
export const environment = {
  production: false,
  API_URL: "http://localhost/projects/_rd/VueWP/wordpress/wp-json/jwt-auth/v1/token"  //<-- Here
};
```



##### login.service.ts

```js
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private _apiUrl = environment.API_URL
  private _loginUrl = "jwt-auth/v1/token" //<-- Here
  
  constructor( private http: HttpClient ) { }

  loginUser( user ) {
    
    console.log(`${this._apiUrl}${this._loginUrl}`);  //<-- Here

    return this.http.post<any>(`${this._apiUrl}${this._loginUrl}`, user)  //<-- Here
  }
}
```

















## Services
- Create Admin Layout here ```/views/backend/layouts/admin-layout/```
- ```ng g c admin-layout```

- Include in app module file.
#### src/app/app.module.ts
```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms' 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './views/frontend/pages/home/home.component';
import { HeaderComponent } from './views/frontend/layouts/header/header.component';
import { PostsComponent } from './views/frontend/pages/posts/posts.component';
import { PostSingleComponent } from './views/frontend/pages/post-single/post-single.component';
import { DefaultLayoutComponent } from './views/frontend/layouts/default-layout/default-layout.component';
import { AuthLayoutComponent } from './views/frontend/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './views/frontend/pages/login/login.component';
import { DashboardComponent } from './views/backend/pages/dashboard/dashboard.component';
import { AdminLayoutComponent } from './views/backend/layouts/admin-layout/admin-layout.component'; //<-- NEW

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PostsComponent,
    PostSingleComponent,
    DefaultLayoutComponent,
    AuthLayoutComponent,
    LoginComponent,
    DashboardComponent,
    AdminLayoutComponent //<-- NEW
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```



- Add route
#### src\app\app-routing.module.ts
```js
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './views/frontend/layouts/default-layout/default-layout.component';

import { HomeComponent } from './views/frontend/pages/home/home.component';
import { PostsComponent } from './views/frontend/pages/posts/posts.component';
import { PostSingleComponent } from './views/frontend/pages/post-single/post-single.component';


import { AuthLayoutComponent } from './views/frontend/layouts/auth-layout/auth-layout.component';

import { LoginComponent } from './views/frontend/pages/login/login.component';


import { AdminLayoutComponent } from './views/backend/layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './views/backend/pages/dashboard/dashboard.component';



const routes: Routes = [
    // basic routes
    {
      path: '',
      component: DefaultLayoutComponent, 
      children: [
        { path: '', component: HomeComponent },
        { path: 'posts', component: PostsComponent },
        { path: "post/:id", component: PostSingleComponent }
      ]
    },
    {
      path: 'login',
      component: AuthLayoutComponent, 
      children: [
        { path: '', component: LoginComponent },
      ]
    },
    {
      path: 'admin',
      component: AdminLayoutComponent, 
      children: [
        { path: 'dashboard', component: DashboardComponent },  // <-- NEW
      ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
```








### Create base service file
- Goto ```src/app/services```
- Run this command ```ng g s base```



#### src/app/services/base.service.ts
```js
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
```









### Call API by Service
- Open post file

#### 
```js
import { Component, OnInit } from '@angular/core';
// import { PostsService } from './posts.service'; // <-- Not in use now

import { HttpClient } from '@angular/common/http';

import { BaseService } from '../../../../services/base.service' // <-- NEW
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
```



















###  Service: Search Post

##### src/app/services/base.service.ts
```js
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
}
```




#### src/app/views/frontend/pages/posts/posts.component.html
```html
<form>
  <input 
    [(ngModel)]="searchData.searchString"
    name="searchString"
    type="text"
    class="form-control"
    (change)="searchFunc()" />
</form>

<div class="table-responsive">
    <table class="table text-center table-hover table-bordered">
      <thead>
        <tr>
          <th style="width: 34%;">ID</th>
          <th style="width: 22%;">Title</th>
          <th style="width: 22%;">Description</th>
        
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let post of posts">
          <td>{{post.id}}</td>
          <td>{{post.title}}</td>
          <td>{{post.content}}</td>
          <td> <a class="btn btn-primary" routerLink='/post/{{post.id}}'>View</a> </td>
        </tr>
      </tbody>
    </table>
</div>
```






#### src/app/views/frontend/pages/posts/posts.component.ts
```js
import { Component, OnInit } from '@angular/core';
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

  searchData = {
    searchString: ''
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
  
  ngOnInit() {
    // this.getPost() // call
  }
}
```














## Delete API


#### base.service.ts

```js
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

  delete(url, id) {
    const headers = this.getHeaders();
    return this.httpClient.delete( `${environment.API_URL}${url}/${id}`, { headers: headers });
  }
}
```





#### posts.component.ts
```js
import { Component, OnInit } from '@angular/core';

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

  searchData = {
    isSearched: false,
    searchString: ''
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


  ngOnInit() {
     this.getPost() // call
  }

}

```






#### posts.component.html
```html
//..
<a class="btn-sm" (click)="deleteFunc(post.id)">X</a>
//..
```














## Create Record APIs


#### base.service.ts
```js
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

  add(url, payload ) { // <-- NEW
    const headers = this.getHeaders();
    return this.httpClient.post( `${environment.API_URL}${url}`, payload , { headers: headers } );
  }

  delete(url, id) {
    const headers = this.getHeaders();
    return this.httpClient.delete( `${environment.API_URL}${url}/${id}`, { headers: headers });
  }

}
```












#### posts.component.html
```html
<form>
  <input 
      [(ngModel)]="formData.title"
      name="title"
      type="text"
      class="form-control" />
  <button (click)="createFunc()">+ New</button>
</form>

<hr>

<form>
  <label>Search</label>
  <input 
    [(ngModel)]="searchData.searchString"
    name="searchString"
    type="text"
    class="form-control"
    (change)="searchFunc()" />
</form>

<div *ngIf="searchData.isSearched==true" class="table-responsive">
    <table class="table text-center table-hover table-bordered">
      <thead>
        <tr>
          <th style="width: 34%;">ID</th>
          <th style="width: 22%;">Title</th>
          <th style="width: 22%;">Description</th>

        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let post of posts">
          <td>{{post.id}}</td>
          <td>{{post.title}}</td>
          <td>{{post.content}}</td>
          <td>
            <a class="btn-sm" routerLink='/post/{{post.id}}'>View</a>
            <a class="btn-sm" (click)="deleteFunc(post.id)">X</a>
          </td>
        </tr>
      </tbody>
    </table>
</div>
```











#### posts.component.ts

```js
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

  formData = { // <-- NEW
    title: '',
    status: 'publish'
  }

  searchData = {
    isSearched: false,
    searchString: ''
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




    createFunc() { // <-- NEW
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


  
  ngOnInit() {
     this.getPost() // call
  }

}
```







## Edit Record API

#### base.service.ts
```js
//...
  edit( url, id, payload) {
    const headers = this.getHeaders();
    return this.httpClient.put( `${environment.API_URL}${url}/${id}`, payload ,{ headers: headers } );
  }
//...
```






#### posts.component.html
```html
// ...
<form>
  <h4>Update</h4>
  <input 
      [(ngModel)]="updateData.title"
      name="title"
      type="text"
      class="form-control" />
  <button (click)="saveUpdateFunc(updateData)">+ Update</button>
</form>
// ...

<div *ngIf="searchData.isSearched==true" class="table-responsive">
    <table class="table text-center table-hover table-bordered">
      <thead>
        <tr>
          <th style="width: 34%;">ID</th>
          <th style="width: 22%;">Title</th>
          <th style="width: 22%;">Description</th>
          
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let post of posts">
          <td>{{post.id}}</td>
          <td>{{post.title.rendered}}</td>
          <td>{{post.content.rendered}}</td>
          <td>
            <a class="btn-sm" routerLink='/post/{{post.id}}'>View</a>
            <a class="btn-sm" (click)="deleteFunc(post.id)">X</a>
            <a class="btn-sm" (click)="updateFunc(post)">Edit</a>
          </td>
        </tr>
      </tbody>
    </table>
</div>
```











##### posts.components.ts
```js
import { Component, OnInit } from '@angular/core';
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

  formData = { // <-- NEW
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



  // <-- NEW
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
```














## Modular based routing

#### src/app/app-routing.module.ts
```js
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './views/frontend/layouts/default-layout/default-layout.component';

import { HomeComponent } from './views/frontend/pages/home/home.component';
import { PostsComponent } from './views/frontend/pages/posts/posts.component';
import { PostSingleComponent } from './views/frontend/pages/post-single/post-single.component';
import { ContactComponent } from './views/frontend/pages/contact/contact.component';


import { AuthLayoutComponent } from './views/frontend/layouts/auth-layout/auth-layout.component';
// import { LoginComponent } from './views/frontend/pages/login/login.component'; // <-- Comment


import { AdminLayoutComponent } from './views/backend/layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './views/backend/pages/dashboard/dashboard.component';



const routes: Routes = [
    // basic routes
    {
      path: '',
      component: DefaultLayoutComponent, 
      children: [
        { path: '', component: HomeComponent },
        { path: 'posts', component: PostsComponent },
        { path: "post/:id", component: PostSingleComponent },
        { path: 'contact', component: ContactComponent },
      ]
    },
    {
      path: 'login',
      component: AuthLayoutComponent, 
      loadChildren: () => import('./views/frontend/pages/login/login.module').then(m => m.LoginModule) // <-- NEW
      // children: [
      //   { path: '', component: LoginComponent },
      // ]
    },
    {
      path: 'admin',
      component: AdminLayoutComponent, 
      children: [
        { path: 'dashboard', component: DashboardComponent },
      ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
```










#### src/app/views/frontend/login/login.module.ts
```js
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login.component';
import { LoginComponentModule } from './login-routing.module';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        LoginComponentModule
    ],
    declarations: [LoginComponent],
    bootstrap: [LoginComponent]
})
export class LoginModule { }
```






#### src/app/views/frontend/login/login-routing.module.ts
```js
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginComponentModule { }

```










## Fetch WooCommerc Products

- Goto ```src/app/views/frontend/pages/```
- Create folder ```product```
- Run command ```npm g c product-list```


### app-routing.module.ts
```js
//..
import { ProductListComponent } from './views/frontend/pages/products/product-list/product-list.component';
//..

const routes: Routes = [
  // basic routes
  //..
    { path: 'products', component: ProductListComponent },
  //..
];
  //..
```










### app.module.ts
```js
//..
import { ProductListComponent } from './views/frontend/pages/products/product-list/product-list.component';
//..

@NgModule({
  declarations: [
    //..
    ProductListComponent
    //..
  ],
  //..
})
export class AppModule { }
```












#### base.services.ts
```js
//...
  public allProduct( url: string ) {
    
    let CK = 'ck_e23d2e0cdfced671b30dd3629332bfd1a9a3d64f';
    let CS = 'cs_efc1cfbaf33f90dc5a95f8e59129c4d5c5471995';

    let FULL_URL = `${environment.API_URL}${url}?consumer_key=${CK}&consumer_secret=${CS}`;
        console.log("URL", FULL_URL )

    return this.httpClient.get( FULL_URL );
  }
//...
```







#### product-list.component.html
```html
<section class="page">
    <div class="container">
        <p>product-list works!</p>
        <div class="row">

            <h4>{{pageTitle}}</h4>

            <div *ngFor="let product of products"
                class="col-md-3">
                <div class="product__img">
                    <img src={{product.images[0].src}} />
                </div>
                <div class="product__cont">
                    <h5>{{product.name}}</h5>
                    <span class="badge">Price: {{product.price}}</span>
                    
                    <div class="cont"
                        [innerHTML]="product.description"></div>

                </div>
            </div>
        </div>
    </div>
</section>
```














#### product-list.component.ts
```js
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../../../services/base.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  pageTitle: string = "Products..";
  products: any;


  constructor(
    public httpClient: HttpClient,
    public baseService: BaseService
  ) { }


  getProducts() {    
    console.log("getProducts()... from baseService")

    this.baseService.allProduct('wc/v3/products').subscribe(
      res => {
        console.log("res", res)
        this.products = res
        console.log( "Prodcut:", this.products )
      },
      err => console.log("err", err)
    )
  }

  ngOnInit(): void {
    this.getProducts()
  }

}
```








## API Error Handling for Products

#### product-list.component.html

```html
//...
<div
    *ngIf="errorMsg"
    class="alert alert-danger">
    {{errorMsg}}
</div>
//...
```





#### product-list.component.ts
```js
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../../../services/base.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  pageTitle: string = "Products..";
  products: any;
  errorMsg: any; // <-- NEW

  constructor(
    public httpClient: HttpClient,
    public baseService: BaseService
  ) { }


  getProducts() {
    
    console.log("getProducts()... from baseService")

    this.baseService.allProduct('wc/v3/products').subscribe(
      res => {
        console.log("res", res)
        this.products = res

        console.log( "Prodcut:", this.products )
      },
      err => {
        console.log("err", err)
        this.errorMsg = `${err.statusText} | Server not response`; // <-- NEW
      }
    )
  }

  ngOnInit(): void {
    this.getProducts()
  }

}
```













## Check object array length in template

```js
*ngIf="productInfo.images?.length !== 1" 
```





##

```js
<button
      *ngFor="let img of productInfo.images; let i = index"
      type="button" data-bs-target="#carouselExampleIndicators" [attr.data-bs-slide-to]="i" class="active" aria-current="true" aria-label="Slide 1">{{i}}</button>
```













## Pagination on Product Listing

#### src/app/services/base.service.ts

```js
//...
  public productListing( url, _options:{ _perPageLimit: number , _currentPageNumber: number } ) {
    
    let FULL_URL = `${environment.API_URL}${url}?consumer_key=${this.CK}&consumer_secret=${this.CS}&per_page=${_options._perPageLimit}&page=${_options._currentPageNumber}`;

    console.log("URL", FULL_URL )

    return this.httpClient.get( FULL_URL );
  }
//...
```














##### src/app/views/frontend/pages/products/product-list/product-list.component.ts

```js
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../../../services/base.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  pageTitle: string = "Products..";
  products: any;
  errorMsg: any;

  pagination = {
    totalRecords: 0,
    currentPage: 1,
    perPage: 3,
    pages: 0,
  };


  constructor(
    public httpClient: HttpClient,
    public baseService: BaseService
  ) { }


  getProducts() {
    
    console.log("getProducts()... from baseService")

    this.baseService.productListing('wc/v3/products', {_perPageLimit:2, _currentPageNumber:2 }).subscribe(
      res => {
        console.log("res", res)
        this.products = res

        console.log( "Prodcut:", this.products )
      },
      err => {
        console.log("err", err)
        this.errorMsg = `${err.statusText} | Server not response`;
      }
    )

  }


  
  


  paginatorFunc() {

    this.baseService.allProduct('wc/v3/products').subscribe(
      res=> {
        this.pagination.totalRecords = res['length']

        let numberOfPages = Math.ceil( this.pagination.totalRecords / this.pagination.perPage )

        console.log("numberOfPages", numberOfPages)
        this.pagination.pages = numberOfPages;

        console.log("total pages..", this.pagination.totalRecords)
      },
      err => {
        console.log("Err", err )
      }
    )
    
  }


  loadNewPage( _num ) {
    this.pagination.currentPage = _num;
    this.getProducts(); // call
  }

  ngOnInit(): void {

    this.paginatorFunc()
    this.getProducts()
  }

}
```










#### product-list.component.html

```html
//..
  <nav>
    <ul class="pagination">
        <li
            *ngFor="let page of [].constructor(pagination.pages); let i = index"
            class="page-item">
            <a class="page-link" (click)="loadNewPage(i+1)" >{{i+1}}</a>
        </li>
    </ul>
</nav>
//..
```













## Custome Pipes
- Creating Pipes ```ng g pipe pipes/age```
- E.g. ```ng g pipe pipes-folder/file-name```


### Age Pipe
#### age.pipe.ts
```js
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    // Your Code Goes Here...
    //2021-12-08T14:00:43
    const d = new Date();
    let num = value.split('-');
    let res = `Year: ${num[0]} Month: ${num[1]}`;
    return res;
  }

}

```




- Import Pipes Module in modules based file ```posts.module.ts```  or ```app.module.ts```

```js
  //..
  import { AgePipe } from '../../../../pipes/age.pipe'; // <-- NEW
  //..
@NgModule({
  //..
  declarations: [
  //..
    AgePipe // <-- NEW
  ],
  //..
})
```

#### posts.module.ts
```js
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PostsComponent } from './posts/posts.component';
import { PostsComponentModule } from './posts-routing.module';

import { AgePipe } from '../../../../pipes/age.pipe'; // <-- NEW


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        PostsComponentModule,
    ],
    declarations: [
        PostsComponent,
        AgePipe // <-- NEW
    ],
    bootstrap: [PostsComponent]
})
export class PostsModule { }
```








#### posts.component.html
```js
//...
  {{ post.date | age }}
//...
```











### Date Time Format Custom Pipe
- Creating Pipes ```ng g pipe pipes/dateTimePipe```
- E.g. ```ng g pipe pipes-folder/file-name```


#### date-time-pipe.pipe.ts
```js
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimePipe'
})
export class DateTimePipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    // 2021-12-08T14:00:43
    let formattedDate = `${new Date( value ).toDateString().slice(4).replace(' ', ', ')} @ ${value.split('T')[1]}`;
    // let formattedDate = val.replace('T', ' @ ')
    return formattedDate;
  }

}
```



- Import Pipes Module in modules based file ```posts.module.ts```  or ```app.module.ts```

```js
  //..
  import { DateTimePipe } from '../../../../pipes/date-time-pipe.pipe'; // <-- NEW
  //..
@NgModule({
  //..
  declarations: [
  //..
    DateTimePipe // <-- NEW
  ],
  //..
})
```









#### home.component.ts
```js
import { Component, OnInit } from '@angular/core';
  // ...

export class HomeComponent implements OnInit {
  // ...

  public todayFormatedFunc = dateFormat('2021-12-30T06:47:00.241');
  public today = '2021-12-30T06:47:00.241' // <-- NEW

  // ...
}
```


#### home.component.html * Usage
```js
{{ today | dateTimePipe }} // <-- NEW
```










## Util

#### app/util/util.services.ts
```js
export const doSomething = (val: string): any => {
  console.log( val++ )
  return val++;
};
```





#### home.components.ts
```ts
import { Component, OnInit } from '@angular/core';
import { doSomething } from 'src/app/util/util.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  
  add = doSomething;

  constructor( ) { }

  ngOnInit(): void { }

}
```





#### home.component.html
```
<button (click)="add(1)">add</button>
```
