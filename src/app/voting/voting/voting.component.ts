import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { VotingService } from '../services/voting.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Position, Alert } from 'src/app/global/models';



@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss',
              './voting-utilities.scss'
 ]
})
export class VotingComponent implements OnInit, OnChanges, OnDestroy {
 
  isChecked:boolean = false
  positionListenerSubs: Subscription
  positions:Position[]
  activeStep = 0
  position: any
  loading:boolean = false
  messageToast:Alert
  votingForm: FormGroup
  
  constructor(
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private votingService: VotingService
  ) {   }

  ngOnChanges(changes: SimpleChanges): void {
    
  }


  ngOnInit(): void {
    
    // get the total positions and aspirants of the voter
    this.votingService.getPositions()

    this.positionListenerSubs = this.votingService.positionsUpdateListener().subscribe((positions) => {
      this.positions = positions      
    })

 

    this.votingForm = this.fb.group({
      mca: ['', Validators.required],
      mp: ['', Validators.required],
      womenrep: ['', Validators.required],
      senator: ['', Validators.required],
      governor: ['', Validators.required],
      presidency: ['', Validators.required]
    })
  }


  ngOnDestroy(): void {
    this.positionListenerSubs.unsubscribe()
  }

 

 
  //submit vote to backend server
  onSubmit() {
    this.loading = true
    if(this.votingForm.valid) {
      this.votingService.vote(this.votingForm.value)
    }
  }

  //next postion
  next() {
    this.activeStep++;
  }

  //previous position
  prev() {
    this.activeStep--
  }

  //user confirmation
  confirm(e: any) {
    
    if(e.checked) {
      this.isChecked = true
    } else {
     this.isChecked = false
    }
  }

 
}
