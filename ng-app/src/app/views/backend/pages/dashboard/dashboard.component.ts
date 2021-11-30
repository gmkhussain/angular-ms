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
    if( localStorage.getItem("token")?.length === 0 ) {
      this.router.navigate(['/']);
      console.log(localStorage.getItem("token"))
    }

  }

  

}
