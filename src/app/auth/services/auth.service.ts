import { Injectable } from '@angular/core';
import { locations } from '../location-mock';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Loc, Voter, Login, VoterLocation} from '../interfaces';
import {Observable, of, Subject} from 'rxjs'
import { AlertService } from 'src/app/global/alert.service';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  votersUpdate = new Subject<Voter[]>()
  loading = new Subject<boolean>()
  voters: Voter[]
  voter = new Subject<Voter>()
  isAuthenticated = new Subject<boolean>()

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  getLocations$():Observable<Loc[]> {
    const locs = of(locations)
    return locs
  }

  votersUpdateListener() {
    return this.votersUpdate.asObservable()
  }

  loadingUpdateListener() {
    return this.loading.asObservable()
  }

  isAuthenticatedListener() {
    return this.isAuthenticated.asObservable()
  }

  getVoterListener() {
    return this.voter.asObservable()
  }
  
  //register user to the server
  registerVoter(voter:Voter) { 
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
   observe: 'body',
   responseType: 'json'
  }   as const

    this.http.post('http://localhost:5000/register', voter, httpOptions).subscribe((res: any) => {
      if(res.success) {
        this.storeAuthData(res.token, res.voter._id)

        
        this.voters.push(res.voter)

        this.votersUpdate.next([...this.voters])
        this.loading.next(false)

        this.isAuthenticated.next(true)

        this.alertService.sendAlert(true, 'Thank you for registering as a voter 😍')

        this.router.navigate(['/voters', res.voter._id])
      }
    }, () => {
      this.loading.next(false)
    })
  }


  //login user to the server
  loginVoter(loginDetails: Login) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'body',
      responseType: 'json'
    } as const

    this.http.post('http://localhost:5000/login', loginDetails, httpOptions).subscribe((res: any) => {

      if(res.success) {
        this.storeAuthData(res.token, res.voter._id)

        this.isAuthenticated.next(true)

        this.alertService.sendAlert(true, 'Welcome back 😀')
        this.loading.next(false)

        this.router.navigate(['/voters', res.voter._id])
      }
    }, () => {
      this.loading.next(false)
    })
  }

  //get all voters
  getVoters() {

    const httpOptions = {
      observe: 'body',
      responseType: 'json'
    } as const;

     this.http.get('http://localhost:5000/voters', httpOptions).subscribe((res: any) => {

      if(res.success) {

        this.voters = res.voters
        
        this.votersUpdate.next([...this.voters])
        this.loading.next(false)
      }
     }, () => {
      this.loading.next(false)
     })
  }

  updateVoter(updateLoc: VoterLocation, id) {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': "application/json",
      }),
      observe: 'body',
      responseType: 'json'

    } as const

    const location = {
      "location": updateLoc
    }

   this.http.patch<any>(`http://localhost:5000/voters/${id}`, location, httpOptions).subscribe((res: any) => {
    if(res.success) {
      
      this.loading.next(false)

      this.alertService.sendAlert(true, `Voting location updated successfully`)

      this.router.navigate(['/voters', res.voter._id])
    }
   }, () => {
    this.loading.next(false)
   })
  }


  getVoter(id: string) {
    
    const httpOptions =  {
      observe: 'body',
      responsType: 'json'
    } as const ;

    this.http.get(`http://localhost:5000/voters/${id}`, httpOptions).subscribe((res: any) => {

      this.voter.next(res.voter)

      this.loading.next(false)
    }, () => {
      this.loading.next(false)
    })
  }

  //logout logged in user

  logout() {

    this.clearAuthData()

    this.isAuthenticated.next(false)
  }

  //Auto auth
  autoAuth() {

    if(localStorage.getItem('token') == null || localStorage.getItem('_id') == null) return
    
   
    this.isAuthenticated.next(true)
  }
  //store auth data
  storeAuthData(token:string, id:string) {

    localStorage.setItem('token', `Bearer ${token}`)
    localStorage.setItem('_id', id)
  }

//Clear AuthData
  
  clearAuthData() {
    localStorage.removeItem('token')
    localStorage.removeItem('_id')
  }
}


