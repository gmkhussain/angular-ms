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