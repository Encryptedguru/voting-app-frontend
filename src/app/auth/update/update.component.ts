import { Component, OnInit, OnDestroy } from '@angular/core';
import { Loc, Constituency, Voter, Alert } from '../interfaces';
import { locations } from '../location-mock';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent 
implements OnInit, OnDestroy{
  counties:Loc[];
  constituencies:Constituency[] ;
  wards:string[];
  updateVoterFSub: Subscription
  updateVoterLocationForm: FormGroup;
  voter:  Voter 
  voterId: string
  loading:boolean = false
  loadingSubs:Subscription
  messageToast: Alert
  getVoterSubs: Subscription

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

   ngOnInit():void  {
    this.loadingSubs = this.authService.loadingUpdateListener().subscribe((loading: boolean) => {
      this.loading = loading
    })

    //get the id
    this.route.params.subscribe((params: any) => {
      this.voterId = params.id
    })

    //get voter to update
    this.authService.getVoter(this.voterId)

    this.getVoterSubs = this.authService.getVoterListener().subscribe((voter: Voter) => {
      this.voter = voter
    })
    

    //form schema 
    this.updateVoterLocationForm = this.fb.group({
      county: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z\-]{2,20}')]],
      constituency: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z\-]{2,20}')]],
      ward: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z\-]{2,20}')]]
    })

     this.getCounties()
    
    this.updateVoterFSub = this.updateVoterLocationForm.valueChanges.subscribe(values => {      
      if(values.county !== '') {
        this.getConstituencies()
      }

      if(values.constituency !== '') {
        this.getWards()
      }
    })

   
  }

  //get funcs for form controls
  get county() {
    return this.updateVoterLocationForm.get('county');
  }
  get constituency() {
    return this.updateVoterLocationForm.get('constituency');
  }
  get ward() {
    return this.updateVoterLocationForm.get('ward');
  }


  getCounties() {
   this.counties = locations
  }

 getConstituencies() {
    for(let i = 0; i < this.counties.length; i++) {

      if(this.counties[i].county == this.updateVoterLocationForm.controls['county'].value) {
        this.constituencies = this.counties[i].constituencies
      }
    }
    
  }

  getWards() {
    for(let i = 0; i < this.constituencies.length; i++) {
      if(this.constituencies[i].constituency == this.updateVoterLocationForm.controls['constituency'].value) {
        this.wards = this.constituencies[i].wards
      }
    }
  }




  onUpdate() {
    this.loading = true
    if(this.updateVoterLocationForm.status === 'VALID') {
     this.authService.updateVoter(this.updateVoterLocationForm.value, this.voterId)
    }
  }

  ngOnDestroy(): void {
    this.updateVoterFSub.unsubscribe()
    this.loadingSubs.unsubscribe()
  }
}
