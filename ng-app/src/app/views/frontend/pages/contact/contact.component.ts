import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

import { BaseService } from '../../../../services/base.service'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  form: FormGroup;
  
  constructor(
    public fb: FormBuilder,
    public baseService: BaseService
  ) {
    this.form = this.fb.group({
      yourName: ['Amoos']
    })
   }

  
 


  formInputs = {
    yourName: 'Amoos',
    yourEmail: 'info@me.now',
    yourSubject: 'Welcome',
    yourMessage: 'Something'
  }


  ngOnInit(): void {
  }

  sendEmailFunc() {
 
    console.log( this.form.value )
 
   var formData: any = new FormData();
       formData.append("yourName", this.form.get("yourName")!.value);
      
     
      this.baseService.sendEmail( formData ).subscribe(
        res => {
          console.log("DONE", res)
        },
        err => {
          console.log("Send Email Err", err )
        }
      )
 
    
  }


}
