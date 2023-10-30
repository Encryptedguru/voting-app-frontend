import { Injectable } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from 'src/app/global/alert.service';
import { Position, VoteModel } from 'src/app/global/models';


@Injectable({
  providedIn: 'root'
})
export class VotingService {
   positions = new Subject<Position[]>()


  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }


   positionsUpdateListener() {
    return this.positions.asObservable()
   }

  // get postions

   getPositions() {

    const token = localStorage.getItem('token')
    const voterId = localStorage.getItem('_id')
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': token,
        'Content-Type': 'application/json'
      }),
      observe: 'body',
      responseType: 'json'
    } as const


    this.http.get(`http://localhost:5000/aspirants/vote/${voterId}`, httpOptions).subscribe((res: any) => {
      
      this.positions.next(res.seats)
    })
  }


  //vote
  vote(vote:VoteModel) {
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': token,
        'Content-Type': 'application/json'
      }),
      observe: 'body',
      responseType: 'json'
    } as const
    
    return this.http.post('http://localhost:5000/vote', vote, httpOptions).subscribe((res: any) => {
      if(res.success) {
        this.alertService.sendAlert(true, 'You have just voted successfully')
      }
    })
  }
}
