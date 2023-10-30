import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { Alert } from '../interfaces';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  loading:boolean = false
  messageToast:Alert;
  token:string
  constructor(
    private fb: FormBuilder,
    private authService: AuthService ,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      idNumber: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8), Validators.pattern('[0-9]{7,8}')]],
      dateOfBirth: ['', [Validators.required]]
    })
  }

  //get funcs for various loginForm formFields for validation
 
  get idNumber() {
    return this.loginForm.get('idNumber')
  }
  get dateOfBirth() {
    return this.loginForm.get('dateOfBirth')
  }

  //login submission
  onLogin() {
   /*  this.loading = true */
    if(this.loginForm.valid) {
      this.authService.loginVoter(this.loginForm.value)
    }
  }


}
