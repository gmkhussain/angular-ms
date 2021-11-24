import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './views/frontend/pages/home/home.component';
import { HeaderComponent } from './views/frontend/layouts/header/header.component';
import { PostsComponent } from './views/frontend/pages/posts/posts.component';
import { PostSingleComponent } from './views/frontend/pages/post-single/post-single.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PostsComponent,
    PostSingleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
