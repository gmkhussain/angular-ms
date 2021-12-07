import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.scss']
})


export class PostSingleComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
  ) {}

  postId: any;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.postId = params['id'];
      console.log(params['id']);
    });
  }

}
