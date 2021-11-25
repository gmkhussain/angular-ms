import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './views/frontend/layouts/default-layout/default-layout.component';

import { HomeComponent } from './views/frontend/pages/home/home.component';
import { PostsComponent } from './views/frontend/pages/posts/posts.component';
import { PostSingleComponent } from './views/frontend/pages/post-single/post-single.component';


import { AuthLayoutComponent } from './views/frontend/layouts/auth-layout/auth-layout.component';

import { LoginComponent } from './views/frontend/pages/login/login.component';



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
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
