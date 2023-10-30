
import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core'
import { Aspirant } from 'src/app/global/models';
import { FormGroup, FormControl, NgForm, ControlContainer, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-aspirant',
  templateUrl: './aspirant.component.html',
  styleUrls: ['./aspirant.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class AspirantComponent implements OnInit, OnChanges {
  @Input() aspirant!:Aspirant
  @Input() votingForm!: FormGroup

   
  constructor(
    public fb: FormBuilder
  ) {  }

  ngOnInit(): void {
    this.createControl()
  }

  ngOnChanges(changes: SimpleChanges): void {

    
  }
 
  createControl() {
    this.votingForm.addControl(this.aspirant.seat, new FormControl(''))
  }
}
