import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './views/frontend/layouts/default-layout/default-layout.component';

import { HomeComponent } from './views/frontend/pages/home/home.component';
import { PostsComponent } from './views/frontend/pages/posts/posts.component';
import { PostSingleComponent } from './views/frontend/pages/post-single/post-single.component';
import { ContactComponent } from './views/frontend/pages/contact/contact.component';


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
        { path: "post/:id", component: PostSingleComponent },
        { path: 'contact', component: ContactComponent },
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
        { path: 'dashboard', component: DashboardComponent },
      ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
