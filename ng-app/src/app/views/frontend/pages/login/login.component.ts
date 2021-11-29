import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserData = {
    username: '',
    password: ''
  }
  constructor( private _login: LoginService) { }

  ngOnInit(): void {

  }

  loginUser() {
    console.log( this.loginUserData )
    // Sending Data to Api
    this._login.loginUser( this.loginUserData ).subscribe(
      res => { console.log( res ) },
      err => { console.log("Login Err", err )
     }
    )

  }


}
