import { Component, OnInit, OnDestroy }                   from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators }  from '@angular/forms';
import { Router }                                         from '@angular/router';
import { ToastrService }                                  from 'ngx-toastr';
import { Subscription }                                   from 'rxjs/Subscription';
import { validateEmail, validatePhone, validateUsername, validatePassword, validateDate } from '../../../tools/FormValidators';
import { UtilsService }                                   from '../../../services/utils.service';
import { ClientService }                                  from '../../../services/client.service';
import { ServiceService }                                 from '../../../services/service.service';
import { Client }                                         from '../../../classes/client';
import { Service }                                        from '../../../classes/service';
import { IGenericResponse }                               from '../../../interfaces/igeneric-response';

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
      private router: Router
    , private toast: ToastrService
    , private utils: UtilsService
    , private clientService: ClientService
    , private serviceService: ServiceService) {
  }

  ngOnInit(): void {
    this.createForm();

    this.subscription_getAll = this.serviceService.getAll().subscribe(
        data  => this.services = data.result
      , err   => this.utils.handleError(err)
      , ()    => this.utils.handleOnComplete
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
      data  => this.handleData(data),
      err   => this.utils.handleError(err),
      ()    => this.utils.handleOnComplete()
    );
  }

  handleData(data: IGenericResponse) {
    // SUCCESS
    if(data.success) {
      this.toast.success(data.message, 'Success!');
      this.router.navigate(['/clients']);
    }
    // ERROR
    else {
      this.toast.error(data.message, 'Error!');
    }
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
