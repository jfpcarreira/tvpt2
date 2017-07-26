import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../../../services/client.service';
import { IClient } from '../../../interfaces/client/iclient';
import { Client } from '../../../classes/client';

@Component({
  selector: 'client-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class ClientNewComponent implements OnInit {

  form: FormGroup;
  processing: Boolean = false;

  constructor(
    private toast: ToastrService
    , private clientService: ClientService
  ) {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({

      // Username Input
      name: new FormControl('NOME TESTE', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15) // Maximum length is 15 characters
      ])),
      email: new FormControl('sdhflsd@ksdgfgsd.com', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15) // Maximum length is 15 characters
      ])),
      address: new FormControl('dhfgshfgskfg', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15) // Maximum length is 15 characters
      ])),
      phone: new FormControl('5146627788', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15) // Maximum length is 15 characters
      ])),
      userSogra: new FormControl('sfdgsfdg', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15) // Maximum length is 15 characters
      ])),
      passSogra: new FormControl('sfdgsdfg', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15) // Maximum length is 15 characters
      ])),
      regDate: new FormControl('', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15) // Maximum length is 15 characters
      ]))
    });
  }

  // Function to submit form
  onSubmit() {
    this.processing = true;
    //    this.disableForm();

    let client = new Client();
    client.setName(this.form.get('name').value);
    client.setEmail(this.form.get('email').value);
    client.setAddress(this.form.get('address').value);
    client.setPhone(this.form.get('phone').value);
    client.setUserSogra(this.form.get('userSogra').value);
    client.setPassSogra(this.form.get('passSogra').value);
    client.setRegistrationDate(this.form.get('regDate').value);

    this.clientService.createClient(client).subscribe(
      data => this.handleSuccess(data),
      err => console.log(err),
      () => console.log('Request complete!')
    );
  }

  handleSuccess(data) {
    if (data.success) {
      this.toast.success('You are awesome!', 'Success!');
      /*
      this.messageClass = 'alert alert-success';
      this.message = data.message;
      setTimeout(() => {
        this.router.navigate(['/login']); // Redirect to login view after 2 second timeout
      }, 2000);*/
    }
    else {
      this.toast.error(data.message, 'Error!');
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