import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AspirantGuard implements CanActivate {

  constructor (
    private authService: AuthService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const _id = localStorage.getItem('_id')
      let role:string;
        
      if(_id) return false

      this.authService.getVoter(_id)

      this.authService.getVoterListener().subscribe((voter: any) => {
        role = voter.role
        
        
      })
      
      
      if(role !== 'aspirant' && role !== 'admin') return false

      return true
  }
  
}
