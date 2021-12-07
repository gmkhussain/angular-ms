import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { PostSingleComponent } from './post-single/post-single.component';

const routes: Routes = [
    {
        path: '',
        component: PostsComponent
    },
    {
        path: "post/:id", component: PostSingleComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PostsComponentModule { }
