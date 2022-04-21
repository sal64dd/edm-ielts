import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CounsellingClientService } from 'src/app/services/counselling.service';

@Component({
  selector: 'app-counselling',
  templateUrl: 'counselling.component.html'
})

export class CounsellingComponent implements OnInit {
  constructor(private liveCounsel: CounsellingClientService, private fb: FormBuilder) { }
  formIndex = 0;
  next(){
    this.formIndex += 1;
  };
  prev(){
    this.formIndex -= 1;

  }

  activeSessions: Observable<DocumentData[]>;
  showLiveSessionModal = false;
  activeSessionId: string;

  showGetUserInfoModal = false;

  showUserCousellingSession = false;


  onSessionStart(sessionId: any){
    console.log(sessionId)
    this.activeSessionId = sessionId;
    this.showLiveSessionModal = true;
  }

  requestid: any;
  userInfoModalResult(res: any){
    this.showGetUserInfoModal = false;
    if(!res){
      console.log('closed')
    } else if(res){
      console.log('res', res);
      this.liveCounsel.addUserToWaitlist(res).then(e => {console.log('result e ', e.id); this.requestid = e.id;} );
      this.showUserCousellingSession = true;
    }
  }


  userData: FormGroup;

  ngOnInit(): void {
    this.userData = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]) ,
      country: new FormControl('', [Validators.required]) ,
      intake: new FormControl('', [Validators.required]) ,
      program: new FormControl('', [Validators.required]) ,
      englishTest: new FormControl('', [Validators.required]) ,
      highestEducation: new FormControl('', [Validators.required]) ,
      grades: new FormControl('', [Validators.required]) ,
      year: new FormControl('', [Validators.required]) ,
    })
  }

  get name(){ return this.userData.get('name');}
  get email(){ return this.userData.get('email');}
  get country(){ return this.userData.get('country');}
  get intake(){ return this.userData.get('intake');}
  get program(){ return this.userData.get('program');}
  get englishTest(){ return this.userData.get('englishTest');}
  get highestEducation(){ return this.userData.get('highestEducation');}
  get grades(){ return this.userData.get('grades');}
  get year(){ return this.userData.get('year');}

  submit(){
    this.userData.markAllAsTouched();
    // this.output.emit(this.userData.value);
    this.userInfoModalResult(this.userData.value);
  }
  userDataErrors(){
    return this.name?.errors || this.email?.errors || this.country?.errors || this.intake?.errors || this.program?.errors
     || this.englishTest?.errors || this.highestEducation?.errors || this.grades?.errors || this.grades?.errors || this.year?.errors;
  }

}
