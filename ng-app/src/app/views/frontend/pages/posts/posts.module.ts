import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PostsComponent } from './posts/posts.component';
// import { PostSingleComponent } from './post-single/post-single.component';
import { PostsComponentModule } from './posts-routing.module';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule, // <-- [Issue Solved] Type 'Event' is not assignable to type 'string'.
        ReactiveFormsModule,
        PostsComponentModule,
    ],
    declarations: [PostsComponent],
    bootstrap: [PostsComponent]
   
})
export class PostsModule { }
