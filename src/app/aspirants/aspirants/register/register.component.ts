import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { mimeType } from '../../mime-type';
import { AspirantsService } from '../aspirants.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs'
import { Aspirant } from 'src/app/global/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  avatarUrl
  mode:string = 'register'
  editAspirantId: string
  editAspirantSubs: Subscription
  aspirant:Aspirant
  voterId: string;
  aspirantForm:FormGroup = this.fb.group({
    name: this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      surName: new FormControl('', Validators.required)
    }),
    seat: ['', [Validators.required, Validators.minLength(2)]],
    party: ['', [Validators.required, Validators.minLength(2)]],
    avatar: [null, {validators: [Validators.required], asyncValidators: [mimeType]}]
  })

  constructor(
    private fb: FormBuilder,
    private aspirantsService: AspirantsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
      this.voterId = this.route.snapshot.paramMap.get('voterId')
    
    this.route.queryParamMap.subscribe((params) => {
      
      
      if(params.has('edit')) {
        this.mode = 'edit'
        this.voterId = this.route.snapshot.paramMap.get("voterId")
      
        this.aspirantsService.getAspirantByVoterId(this.voterId)

        this.editAspirantSubs = this.aspirantsService.getAspirantListener().subscribe((aspirant) => {

          this.editAspirantId = aspirant._id;
          this.aspirant = aspirant
          this.avatarUrl = aspirant.avatarUrl

          this.aspirantForm.patchValue({
            name: aspirant.name,
            seat: aspirant.seat,
            party: aspirant.party,
            avatar: aspirant.avatarUrl
          })
        })
      }
    })
  }
 

  onRegister() {
    
    if(this.aspirantForm.valid && this.mode === 'register') {
      
      this.aspirantsService.registerAspirant(this.aspirantForm.value, this.voterId)
    } else if (this.aspirantForm.valid && this.mode === 'edit') {
      this.aspirantsService.updateAspirant(this.aspirantForm.value, this.editAspirantId)
    }
  }

  chooseImage(e: Event) {
    const file = (e.target as HTMLInputElement).files[0]

    this.aspirantForm.patchValue({
      avatar: file
    })

    this.aspirantForm.updateValueAndValidity()

    const reader = new FileReader()

    reader.onload = () => {
      this.avatarUrl = reader.result
    }

    reader.readAsDataURL(file)
  }

  get name() {
    const nameObj = {}
    for(let ctrl in this.aspirantForm.get('name')['controls']) {
        nameObj[ctrl] = this.aspirantForm.get('name')['controls'][ctrl]
    }
    return nameObj;
  }
  get seat() {
    return this.aspirantForm.get('seat')
  }
  get party() {
    return this.aspirantForm.get('party')
  }
  get avatar() {
    return this.aspirantForm.get('avatar')
  }
}
