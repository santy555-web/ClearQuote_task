import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error: any;

  constructor(public auth:AuthService, public router: Router) {
    this.registerForm = new FormGroup({
      name: new  FormControl(),
      email: new  FormControl(),
      password: new  FormControl(),
      gender: new  FormControl(),
      mobile_no: new  FormControl(),
    });
  }

  ngOnInit() {
  }

  register() {
    console.log('-------------------');
   // debugger
    this.auth.register(this.registerForm.value, status => {
      if (!status) {
        this.error = 'Something went wrong';
        return;
      }
      else{
      console.log(status)
      alert('registered successful');
      this.router.navigate(['/#/login']);
      }
    })
  }
}
