import { Component, OnInit, OnDestroy }       from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService }                      from 'ngx-toastr';
import { Subscription }                       from 'rxjs/Subscription';
import { ClientService }                      from '../../../services';
import { IClient }                            from '../../../interfaces';
import { Client }                             from '../../../classes';

@Component({
  selector: 'client-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class ClientNewComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public processing: Boolean = false;
  private subscription_create: Subscription;

  constructor(private toast: ToastrService, private clientService: ClientService) {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({

      // Username Input
      code: new FormControl('', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15) // Maximum length is 15 characters
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15) // Maximum length is 15 characters
      ])),
      price: new FormControl('', Validators.compose([
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

    this.subscription_create = this.clientService.create(client).subscribe(
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

  ngOnDestroy(): void {
    this.subscription_create.unsubscribe();
  }

}
