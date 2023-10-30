import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopulatedAspirant } from 'src/app/global/models';
import { AspirantsService } from '../aspirants.service';
import { Subscription } from 'rxjs'



@Component({
  selector: 'app-getaspirants',
  templateUrl: './getaspirants.component.html',
  styleUrls: ['./getaspirants.component.scss']
})


export class GetaspirantsComponent implements OnInit, OnDestroy {
  aspirants: PopulatedAspirant[]
  aspirantsSubs: Subscription
  displayedColumns = ['image', 'name', 'position', 'party', 'county', 'constituency', 'ward']

  constructor(
    private aspirantsService: AspirantsService
  ) { }

  ngOnInit(): void {

    this.aspirantsService.getAspirants()

    this.aspirantsSubs = this.aspirantsService.getAspirantsUpdateListener().subscribe((aspirants: PopulatedAspirant[]) =>{
      this.aspirants = aspirants
    })
  }

  ngOnDestroy(): void {
    this.aspirantsSubs.unsubscribe()
  }


  
}
