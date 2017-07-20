import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private toastr: ToastsManager
    , private vcr: ViewContainerRef
    , private formBuilder: FormBuilder
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.createForm(); // Create Angular 2 Form when component loads
  }

  // Function to create registration form
  createForm() {
    this.form = this.formBuilder.group({
      // Username Input
      username: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15) // Maximum length is 15 characters
      ])],
      // Password Input
      password: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(35) // Maximum length is 35 characters
      ])]
    });
  }

  // Function to submit form
  onSubmit() {
    this.toastr.success('You are awesome!', 'Success!');
  }

  ngOnInit() {
  }

}
