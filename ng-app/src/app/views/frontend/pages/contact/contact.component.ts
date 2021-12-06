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
      yourName: ['Amoos'],
      yourEmail: ['info@me.now'],
      yourSubject: ['Welcome'],
      yourMessage: ['Something']
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

  inputChangeFunc() {
    console.log("updated input")
      const _NAME = this.form.get('yourName').value;
      this.form.patchValue({
        yourName: _NAME
      });
  }
  
  sendEmailFunc() {
 
    
    let formData: FormData = new FormData();
        formData.append("yourName", this.form.get('yourName').value);
        formData.append("yourEmail", this.form.get('yourEmail').value);
        formData.append("yourSubject", this.form.get('yourSubject').value);
        formData.append("yourMessage", this.form.get('yourMessage').value);

        console.log("formData", formData )
 
      this.baseService.sendEmail( formData ).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )

  }

}
