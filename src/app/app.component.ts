import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from './auth/services/auth.service';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})


export class AppComponent implements OnInit{


  constructor(
    private authService: AuthService,
    private overlay: OverlayContainer
  ) {}
  ngOnInit(): void {
    this.authService.autoAuth()
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName: ''

      if(darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName)
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName)
      }
    })

   
  }

  @HostBinding('class') className = '';
  title = 'votingapp';
  toggleControl = new FormControl(false);
}
