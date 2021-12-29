import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './views/frontend/layouts/default-layout/default-layout.component';

import { HomeComponent } from './views/frontend/pages/home/home.component';
// import { PostsComponent } from './views/frontend/pages/posts/posts.component';
// import { PostSingleComponent } from './views/frontend/pages/post-single/post-single.component';
import { ContactComponent } from './views/frontend/pages/contact/contact.component';


import { AuthLayoutComponent } from './views/frontend/layouts/auth-layout/auth-layout.component';

// import { LoginComponent } from './views/frontend/pages/login/login.component';
import { ProductListComponent } from './views/frontend/pages/products/product-list/product-list.component';
import { ProductDetailComponent } from './views/frontend/pages/products/product-detail/product-detail.component';


import { AdminLayoutComponent } from './views/backend/layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './views/backend/pages/dashboard/dashboard.component';
import { UsersComponent } from './views/backend/pages/users/users.component';



const routes: Routes = [
    // basic routes
    {
      path: '',
      component: DefaultLayoutComponent, 
      children: [
        { path: '', component: HomeComponent },
        // { path: 'posts', component: PostsComponent },
        // { path: "post/:id", component: PostSingleComponent },
        
        { path: 'contact', component: ContactComponent },
        { path: 'products', component: ProductListComponent },
        { path: 'product/:id', component: ProductDetailComponent },
      ]
    },
    
    {
      path: 'posts',
      loadChildren: () => import('./views/frontend/pages/posts/posts.module').then(m => m.PostsModule)
    },
    {
      path: 'login',
      component: AuthLayoutComponent, 
      loadChildren: () => import('./views/frontend/pages/login/login.module').then(m => m.LoginModule)
      // children: [
      //   { path: '', component: LoginComponent },
      // ]
    },
    {
      path: 'admin',
      component: AdminLayoutComponent, 
      children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'users', component: UsersComponent },
      ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
