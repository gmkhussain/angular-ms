import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/frontend/pages/home/home.component';
import { PostsComponent } from './views/frontend/pages/posts/posts.component';
import { PostSingleComponent } from './views/frontend/pages/post-single/post-single.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'posts', component: PostsComponent },
  { path: "post/:id", component: PostSingleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
