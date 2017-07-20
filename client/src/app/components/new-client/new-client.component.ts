import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {

  form: FormGroup;
  processing: Boolean = false;

  constructor(
      private toastr: ToastsManager
    , private vcr: ViewContainerRef
    , private formBuilder: FormBuilder
    , private clientService: ClientService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.createForm(); // Create Form when component loads
  }

  // Function to create registration form
  createForm() {
    this.form = this.formBuilder.group({
      // Username Input
      name: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15) // Maximum length is 15 characters
      ])],
      email: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15) // Maximum length is 15 characters
      ])],
      address: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15) // Maximum length is 15 characters
      ])],
      phone: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15) // Maximum length is 15 characters
      ])],
      userSogra: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15) // Maximum length is 15 characters
      ])],
      passSogra: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15) // Maximum length is 15 characters
      ])],
      regDate: ['TESTE', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15) // Maximum length is 15 characters
      ])]
    });
  }

  // Function to submit form
  onSubmit() {
    this.processing = true;
//    this.disableForm();

    const client = {
      name: this.form.get('name').value,
      email: this.form.get('email').value,
      address: this.form.get('address').value,
      phone: this.form.get('phone').value,
      userSogra: this.form.get('userSogra').value,
      passSogra: this.form.get('passSogra').value,
      regDate: this.form.get('regDate').value
    }

    // Function from authentication service to register user
    this.clientService.createClient(client).subscribe(
      data => this.handleSuccess(data),
      error => console.log(error),
      () => console.log('Request complete!')
    );
  }

  handleSuccess(data) {
    if (data.success) {
      this.toastr.success('You are awesome!', 'Success!');
      /*
      this.messageClass = 'alert alert-success';
      this.message = data.message;
      setTimeout(() => {
        this.router.navigate(['/login']); // Redirect to login view after 2 second timeout
      }, 2000);*/
    }
    else {
      this.toastr.error('Client was not created!', 'Error!');
/*
      this.messageClass = 'alert alert-danger';
      this.message = data.message;
      this.processing = false;
      this.enableForm();
*/
    }
  }

  ngOnInit() {
  }

}
