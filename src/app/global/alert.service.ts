import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert } from './models';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  alert = new Subject<Alert>()


  alertListener() {
    return this.alert.asObservable()
  }

  sendAlert(success: boolean, message: string) {

   this.alert.next({success, message})
  }
}



