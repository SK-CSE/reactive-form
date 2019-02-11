import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { debounceTime, tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
// import {OobService} from '../oob.service'

@Component({
  selector: 'app-oob',
  templateUrl: './oob.component.html',
  styleUrls: ['./oob.component.css']
})

export class OobComponent implements OnInit {
  oobForm: FormGroup;
  emailMessage: string;
  industry:any;
  job_function:any;
  objective_of_taking_course:any;
  qualification:any;
  currentStep: Number;
  isPro: boolean = true;
  isEntre: boolean;
  isStudent: boolean;
  a = [1,2,3];
  private validationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.'
  };

  get addresses(): FormArray {
    return <FormArray>this.oobForm.get('addresses');
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // this.OobService.getDropdownData().subscribe(
    //   data =>{
    //     this.industry = data['data']['industry'];
    //     this.job_function = data['data']['job_function'];
    //     this.objective_of_taking_course = data['data']['objective_of_taking_course'];
    //     this.qualification = data['data']['qualification'];
    //     console.log(this.objective_of_taking_course);
    //     console.log('');
    //   },
    //   err => { console.log('eeeeeeeeeee',err)}
    // )
    this.oobForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      linkedinUrl: '',
      state: [''],
      city:['', Validators.required],
      dob:['', Validators.required],
      educational_history:['', Validators.required],
      b2cType: 'professional',
      job_title:['', Validators.required],
      department:['', Validators.required],
      company_name:['', Validators.required],
      industry:['', Validators.required],
      objective_training:['', Validators.required],
      training_funded_by:['', Validators.required],
      college:'',
      specialization:''

    });

    this.oobForm.get('b2cType').valueChanges.subscribe(
      value => {this.hideAndShowInputBox(value)
      console.log(value)}
    );

    const emailControl = this.oobForm.get('userName');
    emailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(emailControl)
    );
  }

  save() {
    console.log(this.oobForm);
    console.log('Saved: ' + JSON.stringify(this.oobForm.value));
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    console.log(this.validationMessages);
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.emailMessage += this.validationMessages[key]).join(' ');
    }
  }

  hideAndShowInputBox(notifyVia: string): void {
    const phoneControl = this.oobForm.get('phone');
    const collegeControl = this.oobForm.get('college');
    const specializationControl = this.oobForm.get('specialization');
    const job_titleControl = this.oobForm.get('job_title');
    const departmentControl = this.oobForm.get('department');
    const company_nameControl = this.oobForm.get('company_name');
    const industryControl = this.oobForm.get('industry');

    if (notifyVia === 'student') {
      this.isStudent = true;
      this.isEntre = false;
      this.isPro = false;
      collegeControl.setValidators(Validators.required);
      specializationControl.setValidators(Validators.required);

      job_titleControl.clearValidators();
      departmentControl.clearValidators();
      company_nameControl.clearValidators();
      industryControl.clearValidators();

    } else if(notifyVia === 'professional'){
      this.isStudent = false;
      this.isEntre = false;
      this.isPro = true;

      collegeControl.clearValidators();
      specializationControl.clearValidators();

      // phoneControl.clearValidators();
    }
    else if(notifyVia === 'entrepreneur'){
      this.isStudent = false;
      this.isEntre = true;
      this.isPro = false;

      job_titleControl.clearValidators();
      departmentControl.clearValidators();
      industryControl.clearValidators();

      // phoneControl.clearValidators();
    }
    // phoneControl.updateValueAndValidity();
  }

}

