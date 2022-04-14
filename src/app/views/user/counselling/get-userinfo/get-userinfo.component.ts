import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDefaultComponent } from 'src/app/components/common/modal-default/modal-default.component';

@Component({
  selector: 'app-modal-get-userinfo',
  templateUrl: './get-userinfo.component.html',
  styleUrls: ['./get-userinfo.component.css']
})
export class GetUserinfoComponent extends ModalDefaultComponent implements OnInit {

  constructor(private fb: FormBuilder) { super(); }

  userData!: FormGroup;

  ngOnInit(): void {
    this.userData = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      country: ['', [Validators.required]],
      intake: ['', [Validators.required]],
      program: ['', [Validators.required]],
      englishTest: ['', [Validators.required]],
      highestEducation: ['', [Validators.required]],
      grades: ['', [Validators.required]],
      year: ['', [Validators.required]],
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
    this.output.emit(this.userData.value);
  }
  userDataErrors(){
    return this.name?.errors || this.email?.errors || this.country?.errors || this.intake?.errors || this.program?.errors
     || this.englishTest?.errors || this.highestEducation?.errors || this.grades?.errors || this.grades?.errors || this.year?.errors;
  }
}
