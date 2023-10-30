import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-nav',
  templateUrl: './dynamic-nav.component.html',
  styleUrls: ['./dynamic-nav.component.scss']
})
export class DynamicNavComponent implements OnInit {
  active:boolean = false
  darkVal:boolean = this.checkVal
  constructor() { }

  ngOnInit(): void {
  }

 get checkVal() {
  let darkmode;
  let val:boolean

  if(localStorage.getItem('darkmode') == null) {
      val = false       
  } else {
    darkmode = JSON.parse(localStorage.getItem('darkmode'))
    val = darkmode.darkmode
  }
  return val
 }

 themify(val: boolean) {
  let darkmode = { darkmode: false};
  if(localStorage.getItem('darkmode') == null) {
    darkmode.darkmode = true
   localStorage.setItem('darkmode', JSON.stringify(darkmode))    
 } else {
  darkmode.darkmode = !val
   localStorage.setItem('darkmode', JSON.stringify(darkmode))
 }
 }
}
