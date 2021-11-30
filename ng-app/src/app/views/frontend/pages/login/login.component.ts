import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service'

import { Router } from '@angular/router'; //<-- For Redirect

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserData = {
    username: '',
    password: '',
    loginFeedback: ''
  }
  
  constructor(
      private _login: LoginService,
      private router: Router //<-- For Redirect
    ) { }

  ngOnInit(): void {

  }

  loginUser() {
    console.log( this.loginUserData )
    // Sending Data to Api
    this._login.loginUser( this.loginUserData ).subscribe(
      res => {
        console.log( res );

        localStorage.setItem("token", res.token)
        console.log( "Token::", localStorage.getItem("token") )
        
        
        this.router.navigate(['/admin/dashboard']); //<-- Redirecting to dashboard

      },
      err => {
        console.log("Login Err", err )
        this.loginUserData.loginFeedback = "Try again..."
     }
    )

  }


}
