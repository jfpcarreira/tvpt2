import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private toast: ToastrService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm(): void {
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
  onSubmit(): void {
    this.toast.success('You are awesome!', 'Success!');
  }

  ngOnInit(): void {
  }

}
