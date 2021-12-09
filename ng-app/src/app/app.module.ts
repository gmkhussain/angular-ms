import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms' //<-- Login Form


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './views/frontend/pages/home/home.component';
import { HeaderComponent } from './views/frontend/layouts/header/header.component';
// import { PostsComponent } from './views/frontend/pages/posts/posts.component';
// import { PostSingleComponent } from './views/frontend/pages/posts/post-single/post-single.component';
import { DefaultLayoutComponent } from './views/frontend/layouts/default-layout/default-layout.component';
import { AuthLayoutComponent } from './views/frontend/layouts/auth-layout/auth-layout.component';
// import { LoginComponent } from './views/frontend/pages/login/login.component';
import { DashboardComponent } from './views/backend/pages/dashboard/dashboard.component';
import { AdminLayoutComponent } from './views/backend/layouts/admin-layout/admin-layout.component';
import { ContactComponent } from './views/frontend/pages/contact/contact.component';

import { ProductListComponent } from './views/frontend/pages/products/product-list/product-list.component';
import { ProductDetailComponent } from './views/frontend/pages/products/product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    // PostsComponent,
    // PostSingleComponent,
    DefaultLayoutComponent,
    AuthLayoutComponent,
    // LoginComponent,
    DashboardComponent,
    AdminLayoutComponent,
    ContactComponent,
    ProductListComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
