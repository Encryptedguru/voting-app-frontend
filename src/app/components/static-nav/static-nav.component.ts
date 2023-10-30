import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-static-nav',
  templateUrl: './static-nav.component.html',
  styleUrls: ['./static-nav.component.scss']
})
export class StaticNavComponent implements OnInit, OnDestroy {

  isAuthSubs:Subscription
  isAuthenticated:boolean = false
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.isAuthSubs = this.authService.isAuthenticatedListener().subscribe((isAuth: boolean) => {
      this.isAuthenticated = isAuth
      console.log(this.isAuthenticated)
    })
  }

  ngOnDestroy(): void {
    this.isAuthSubs.unsubscribe()
  }

}
