import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';
import { Alert } from '../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  alert:Alert
  alertSubs: Subscription
  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.alertSubs = this.alertService.alertListener().subscribe((alert) => {
      this.alert = alert
    })
  }

  ngOnDestroy(): void {

    this.alertSubs.unsubscribe()
  }


  removeAlert(e:any) {
    e.target.parentElement.remove()
  }
}
