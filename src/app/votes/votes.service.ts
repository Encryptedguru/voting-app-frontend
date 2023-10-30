import { Injectable } from '@angular/core';
import { Subject }  from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VotesService {

  competitors = new Subject()

  constructor(
    private http: HttpClient
  ) { }

  getCompetitorsListener() {
    return this.competitors.asObservable()
  }
  getVotes(competitorsData: any) {

    const httpOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    this.http.post('http://localhost:5000/competitors', competitorsData).subscribe((res: any) => {
      
       if(res.success) {
        this.competitors.next({competitors: res.competitors, presidents: res.presidents})
       }
    })
  }


}
