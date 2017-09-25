import { Component, OnInit, OnDestroy }       from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService }                      from 'ngx-toastr';
import { Subscription }                       from 'rxjs/Subscription';
import { validateEmail, validatePhone, validateUsername, validatePassword, validateDate } from '../../../tools/FormValidators';
import { ClientService }                      from '../../../services/client.service';
import { ServiceService }                     from '../../../services/service.service';
import { Client }                             from '../../../classes/client';
import { Service }                            from '../../../classes/service';

@Component({
  selector: 'client-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class ClientNewComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public processing: Boolean = false;
  public services: Service[];
  private subscription_create: Subscription;
  private subscription_getAll: Subscription;

  constructor(
      private toast: ToastrService
    , private clientService: ClientService
    , private serviceService: ServiceService
  ) {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({

      // Username Input
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        validateEmail
      ])),
      address: new FormControl('', Validators.compose([
        Validators.required
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        validatePhone
      ])),
      userSogra: new FormControl('', Validators.compose([
        Validators.required,
        validateUsername
      ])),
      passSogra: new FormControl('', Validators.compose([
        Validators.required,
        validatePassword
      ])),
      regDate: new FormControl('', Validators.compose([
        validateDate
      ])),
      services: new FormControl('', Validators.compose([
      ]))
    });
  }

  // Function to submit form
  onSubmit() {
    this.processing = true;
    //    this.disableForm();

    const client = new Client();
    client.setName(this.form.get('name').value);
    client.setEmail(this.form.get('email').value);
    client.setAddress(this.form.get('address').value);
    client.setPhone(this.form.get('phone').value);
    client.setUserSogra(this.form.get('userSogra').value);
    client.setPassSogra(this.form.get('passSogra').value);
    client.setRegistrationDate(this.form.get('regDate').value);
    client.setServices(this.services);

    this.subscription_create = this.clientService.create(client).subscribe(
      data => this.handleSuccess(data),
      err => console.log(err),
      () => console.log('Request complete!')
    );
  }

  handleSuccess(data) {
    if (data.success) {
      this.toast.success('You are awesome!', 'Success!');
    } else {
      this.toast.error(data.message, 'Error!');
    }
  }

  ngOnInit() {
    this.subscription_getAll = this.serviceService.getAll().subscribe(
        data => this.services = data.result
      , err => console.log(err)
      , () => console.log('Request complete!')
    );
  }

  ngOnDestroy(): void {
    if(typeof this.subscription_create != "undefined") this.subscription_create.unsubscribe();
    if(typeof this.subscription_getAll != "undefined") this.subscription_getAll.unsubscribe();
  }

  bla() {
    console.log(this.services);
  }
}
