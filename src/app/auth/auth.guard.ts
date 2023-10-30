import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  voter:any;
  constructor (
    private authService: AuthService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(localStorage.getItem('_id') == null) return false 

      const _id = localStorage.getItem('_id')

        this.authService.getVoter(_id)

        this.authService.getVoterListener().subscribe((voter) => {
          this.voter = voter
        })
      

        if(!this.voter) return false

    return true;
  }
  
}
