import { Component, OnInit, OnDestroy } from '@angular/core';
import { Alert, Voter } from '../interfaces';
import {Router, ActivatedRoute, ParamMap} from '@angular/router'
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html',
  styleUrls: ['./voter.component.scss']
})
export class VoterComponent implements OnInit, OnDestroy {

  voterId:string
  voter:Voter = {
    idNumber: '',
    dateOfBirth: new Date(),
    gender: '',
    location: {
      county: '',
      constituency: '',
      ward: ''
    }
  }
  messageToast: Alert
  loading: boolean = false
  getVoterSubs:Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loading = true
     //get the id
     this.route.params.subscribe((params: any) => {
      this.voterId = params.id
    })


    this.authService.getVoter(this.voterId)
    
    this.getVoterSubs = this.authService.getVoterListener().subscribe((voter: Voter) => {
      this.voter = voter
    })
    
  }

  ngOnDestroy(): void {
    this.getVoterSubs.unsubscribe()
  }

}
