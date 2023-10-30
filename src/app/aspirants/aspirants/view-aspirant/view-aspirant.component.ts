import { Component, OnInit, OnDestroy } from '@angular/core';
import { Aspirant } from 'src/app/global/models';
import { AspirantsService } from '../aspirants.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription} from 'rxjs'

@Component({
  selector: 'app-view-aspirant',
  templateUrl: './view-aspirant.component.html',
  styleUrls: ['./view-aspirant.component.scss']
})
export class ViewAspirantComponent implements OnInit, OnDestroy {
   aspirant: Aspirant
   aspirantId: string
   aspirantSubs: Subscription
  constructor(
    private aspirantService: AspirantsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
   
    this.route.paramMap.subscribe((params) => {
      if(params.has('id')) {
        this.aspirantId = params.get('id')

        this.aspirantService.getAspirant(this.aspirantId) 

        this.aspirantSubs = this.aspirantService.getAspirantListener().subscribe((aspirant) => {
          this.aspirant = aspirant
        })
      }
    })
  }


  ngOnDestroy():void {
    this.aspirantSubs.unsubscribe()
  }
}
