import { Component, OnInit, OnDestroy }                   from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators }  from '@angular/forms';
import { Router }                                         from '@angular/router';
import { ToastrService }                                  from 'ngx-toastr';
import { Subscription }                                   from 'rxjs/Subscription';
import { Ng4LoadingSpinnerService }                       from 'ng4-loading-spinner';
import { validateEmail, validatePhone, validateUsername, validatePassword, validateDate } from '../../../tools/FormValidators';
import { HandleHttpCall }                                 from '../../../classes/abstract/handleHttpCall';
import { ClientService }                                  from '../../../services/client.service';
import { ServiceService }                                 from '../../../services/service.service';
import { Client }                                         from '../../../classes/client';
import { Service }                                        from '../../../classes/service';

@Component({
  selector: 'client-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class ClientNewComponent extends HandleHttpCall implements OnInit, OnDestroy {

  public form: FormGroup;
  public processing: Boolean = false;
  public services: Service[];
  private subscription_create: Subscription;
  private subscription_getAll: Subscription;

  constructor(
      private toast: ToastrService
    , private clientService: ClientService
    , private serviceService: ServiceService
    , private router: Router
    , private spinner: Ng4LoadingSpinnerService) {
      super(router, toast, spinner);
  }

  ngOnInit(): void {
    this.createForm();

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

  createForm(): void {
    this.form = new FormGroup({
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
      services: new FormArray([])
    });
  }

  onSubmit(): void {
    this.spinner.show();
    //    this.disableForm();

    const client = new Client();
    client.setName(this.form.get('name').value);
    client.setEmail(this.form.get('email').value);
    client.setAddress(this.form.get('address').value);
    client.setPhone(this.form.get('phone').value);
    client.setUserSogra(this.form.get('userSogra').value);
    client.setPassSogra(this.form.get('passSogra').value);
    client.setRegistrationDate(this.form.get('regDate').value);
    client.setServices( this.form.get('services').value );

    this.subscription_create = this.clientService.create(client).subscribe(
      data => super.handleDataResponse(data, null, '/clients'),
      err => console.log(err)
    );
  }

  onChange(service:Service, isChecked: boolean): void {
    const servicesFormArray = <FormArray> this.form.controls.services;

    if(isChecked) {
      servicesFormArray.push(new FormControl(service));
    }
    else {
      let index = servicesFormArray.controls.findIndex(x => x.value == service)
      servicesFormArray.removeAt(index);
    }
  }
}
