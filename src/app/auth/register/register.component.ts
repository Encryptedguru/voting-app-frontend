import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Loc, Constituency, Alert } from '../interfaces';
import {MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio'
import { Subscription } from 'rxjs'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'accent' },
}]
})
export class RegisterComponent implements OnInit, OnDestroy {

  regFormSub: Subscription
  locationsSub:Subscription
  registerForm:FormGroup;
  counties:Loc[];
  constituencies:Constituency[]
  wards: string[]
  loading:boolean = false
  messageToast: Alert


  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    //fetch locations from database/mock-database
  this.locationsSub = this.authService.getLocations$().subscribe(locs => {
    this.counties = locs
  })

    
    //form model and controls
    this.registerForm = this.fb.group({
       idNumber: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8), Validators.pattern('[0-9]{7,8}')]],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      location: this.fb.group({
        county: ['', [Validators.required, Validators.minLength(2)]],
        constituency: ['', [Validators.required, Validators.minLength(2)]],
        ward: ['', [Validators.required, Validators.minLength(2)]]
      })
    }) 
    
    
    this.regFormSub = this.registerForm.valueChanges.subscribe(values => {
      if(values.location.constituency !== '') {        
        this.getwards()
      }

      if(values.location.county !== '') {
        this.getconstituencies()
      }
      
    })
    
  }

  //Get functions for various registerFromControls
  get idNumber() {
    return this.registerForm.get('idNumber')
  }
  get dateOfBirth() {
    return this.registerForm.get('dateOfBirth')
  }
 get gender() {
  return this.registerForm.get('gender')
 }
 get location() {
  return this.registerForm.get('location')
 }

  //get constituts for a given county
   getconstituencies() {
    
    for(let i = 0; i < this.counties.length; i++) 
    {
      if(this.counties[i].county == this.registerForm.controls['location'].value.county) {
        this.constituencies = this.counties[i].constituencies
      }
    }
  }

  //get wards for given constituency
  getwards() {
    for(let i = 0; i < this.constituencies.length; i++) {
      if(this.constituencies[i].constituency == this.registerForm.controls['location'].value.constituency) {
        this.wards = this.constituencies[i].wards
        
      }
    }
  } 

  //Submit the form
  onSubmit() {
    this.loading = true
    this.authService.registerVoter(this.registerForm.value)
  }


  //unsubscribe to observables
  ngOnDestroy(): void {
    this.regFormSub.unsubscribe()
    this.locationsSub.unsubscribe()
  }
 

}
