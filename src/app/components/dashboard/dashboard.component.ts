import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  outputString: string = ''
  landString: string = 'Vote your Kenyan political candidates just by a click, Inspired by 2022 General Elections.'
  stringArr:string[] = this.landString.split('')
 loopTimer;

  constructor() { }

  ngOnInit(): void {
  
    this.iterator()    
  }
 
 
 iterator() {
 

   if(this.stringArr.length > 0) {
     this.outputString += this.stringArr.shift()

   } else {
    clearTimeout(this.loopTimer)
   }
   this.loopTimer = setTimeout(() => {
    this.iterator()
   }, 100)
 }

}
