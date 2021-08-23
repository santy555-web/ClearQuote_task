import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: any;

  constructor(public auth:AuthService, public router: Router) {
    this.loginForm = new FormGroup({
      email:  new FormControl(),
      password:  new FormControl()
    });
  }

  ngOnInit() {
  }

  login() {
    console.log('-------------------')
    this.auth.login(this.loginForm.value, status => {
      if (!status) {
        this.error = 'Something went wrong';
        return;
      }
      this.router.navigateByUrl('/');
    })
  }
}
