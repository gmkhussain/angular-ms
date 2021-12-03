import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../../../services/base.service'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(
    public baseService: BaseService
  ) { }

  formInputs = {
    yourName: 'Amoos',
    yourEmail: 'info@me.now',
    yourSubject: 'Welcome',
    yourMessage: 'Something'
  }


  ngOnInit(): void {
  }

  sendEmailFunc() {
 
    const emailBody = {
          "yourName": "this.formInputs.yourName",
          "yourEmail": this.formInputs.yourEmail,
          "yourSubject": this.formInputs.yourSubject,
          "yourMessage": this.formInputs.yourMessage,
        };


      let formData = new FormData();
          formData.append("yourName", this.formInputs.yourName);

      console.log(JSON.stringify(formData))

      formData.forEach((value,key) => {
        console.log(key+" "+value)
      });
        
    
    
      setTimeout( ()=> {
        
          this.baseService.sendEmail( formData ).subscribe(
            res => {
              console.log("DONE", res)
            },
            err => {
              console.log("Send Email Err", err )
            }
          )

      }, 1000 )
    
  }


}
