import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/global/alert.service';
import { VotesService } from '../votes.service';
import { Loc, Constituency } from 'src/app/auth/interfaces';
import { locations } from 'src/app/auth/location-mock';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-competitors-votes',
  templateUrl: './competitors-votes.component.html',
  styleUrls: ['./competitors-votes.component.scss']
})
export class CompetitorsVotesComponent implements OnInit {
  aspirants:any[]
  presidents: any[]
  presidentsTotalVotes: number;
  aspirantsTotalVotes: number;
  aspirantsSubs:Subscription
  counties: Loc[] = locations
  constituencies: Constituency[]
  wards: string[]
  positionsForm:FormGroup = this.fb.group({
    position: ['', Validators.required],
    location: this.fb.group({
      county: ['', Validators.required],
      constituency: [''],
      ward: ['']
    })
  })
  positionFormSubs:Subscription



  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private votesService: VotesService
  ) { }

  ngOnInit(): void {
        this.positionFormSubs = this.positionsForm.valueChanges.subscribe((res: any) => {

          if(res.location.county !== '') {
            this.getconstituencies()
          }

          if(res.location.constituency !== '') {
            this.getwards()
          }
        })
  }


 
  //onget votes

  onGetVotes() {

    if(this.positionsForm.invalid) {
      this.alertService.sendAlert(false, 'Please fill in all the details')
      return
    }
      this.votesService.getVotes(this.positionsForm.value)
      
      this.aspirantsSubs = this.votesService.getCompetitorsListener().subscribe((res: any) => {
       
        console.log(res)
        this.aspirants = res.competitors
        this.presidents = res.presidents

        this.presidentsTotalVotes = this.presidents.reduce((acc, curr) => {
          
          return acc + curr.votes
      
        }, 0)

        this.aspirantsTotalVotes = this.aspirants.reduce((acc, curr) => {
          
         return  acc + curr.votes
        }, 0)

      })
  }
 

  //get funcs for postions form controls

  get position() {
    return this.positionsForm.get('position')
  }

  get location() {
    return this.positionsForm.get('location')
  }

   //get constituts for a given county
   getconstituencies() {
    
    for(let i = 0; i < this.counties.length; i++) 
    {
      if(this.counties[i].county == this.positionsForm.controls['location'].value.county) {
        this.constituencies = this.counties[i].constituencies
      }
    }
  }

  //get wards for given constituency
  getwards() {
    for(let i = 0; i < this.constituencies.length; i++) {
      if(this.constituencies[i].constituency == this.positionsForm.controls['location'].value.constituency) {
        this.wards = this.constituencies[i].wards
        
      }
    }
  } 


}
