import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aspirant, PopulatedAspirant } from 'src/app/global/models';
import { AlertService } from 'src/app/global/alert.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AspirantsService {

  aspirants = new Subject<PopulatedAspirant[]>()
  aspirant= new Subject<Aspirant>()

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private router: Router
  ) { }

  getAspirantsUpdateListener() {
    return this.aspirants.asObservable()
  }
  getAspirantListener() {
    return this.aspirant.asObservable()
  }

  registerAspirant(aspirantData: Aspirant, voterId:string) {

    const formData = new FormData()

    formData.append("name", JSON.stringify(aspirantData['name']))
    formData.append('party', aspirantData.party)
    formData.append('seat', aspirantData.seat)
    formData.append('avatar', aspirantData.avatar, aspirantData.name)

    console.log(formData);
    
    
    this.http.post(`http://localhost:5000/${voterId}/aspirants`, formData).subscribe((res: any) => {

      if(res.success) {
        console.log(res);
        
       
        this.alertService.sendAlert(true, `You have been registered as an ${res.aspirant.seat} position`)

        this.storeAspirantId(res.aspirant._id)

        this.router.navigate(['/aspirants', `${res.aspirant._id}`])
      }
    })
  }

  updateAspirant(aspirantData: Aspirant, aspirantId) {

    if(typeof aspirantData.avatar === 'string') {
      
      this.http.patch(`http://localhost:5000/aspirants/${aspirantId}`, aspirantData).subscribe((res: any) => {
        
         if(res.success) {
          this.alertService.sendAlert(true, 'Details updated successfully')
          this.router.navigate(['/aspirants', res.aspirant._id])
         }
      })
    } else {

      const formData = new FormData()

      formData.append('name', aspirantData.name)
      formData.append('seat', aspirantData.seat)
      formData.append('avatar', aspirantData.avatar)
      formData.append('party', aspirantData.party)

      this.http.patch(`http://localhost:5000/aspirants/${aspirantId}`, formData).subscribe((res: any) => {
        
      if(res.success) {
        this.alertService.sendAlert(true, 'Details updated successfully')
        this.router.navigate(['/aspirants', res.aspirant._id])
      }
      })
    }

  }

  getAspirantByVoterId(voterId: string) {
    this.http.get("http://localhost:5000/voterId/"+voterId).subscribe((response: any) => {
      if(response.success) {
        this.aspirant.next(response['aspirant'])
      }
    })
  }

  //get Aspirants
  getAspirants() {

    const httpOptions = {

      responseType: 'json'
    } as const

    this.http.get('http://localhost:5000/aspirants', httpOptions).subscribe((res: any) => {

      if(res.success) {

        this.aspirants.next([...res.aspirants])
      }
    })
  }

  getAspirant(id: string) {
    const httpOptions = {
      responseType: 'json'
    } as const

    this.http.get(`http://localhost:5000/aspirants/${id}`, httpOptions).subscribe((res: any) => {

      if(res.success) {
        this.aspirant.next(res.aspirant)
      }
    })
  }

  logoutAspirant() {
    this.clearAspirantId()
  }


  storeAspirantId(id: string) {
    localStorage.setItem('aspirantId', id)
  }

  clearAspirantId() {
    localStorage.removeItem('aspirantId')
  }
}
