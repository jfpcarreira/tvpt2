import { Component, OnInit, OnDestroy }       from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService }                      from 'ngx-toastr';
import { Subscription }                       from 'rxjs/Subscription';
import { ServiceService }                     from '../../../services/service.service';
import { CurrencyService }                    from '../../../services/currency.service';
import { IService }                           from '../../../interfaces/service/iservice';
import { Service }                            from '../../../classes/service';
import { Currency }                           from '../../../classes/currency';

@Component({
  selector: 'service-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class ServiceNewComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public processing: Boolean = false;
  public currencies: Currency[];
  private subscription_create: Subscription;
  private subscription_getAll: Subscription;

  constructor(private toast: ToastrService, private serviceService: ServiceService, private currencyService: CurrencyService) {
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      code: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3)
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      price: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(0)
      ])),
      currency: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  // Function to submit form
  onSubmit(): void {
    this.processing = true;
    //    this.disableForm();

    let service = new Service();
    service.setCode(this.form.get('code').value);
    service.setName(this.form.get('name').value);
    service.setPrice(this.form.get('price').value);
    service.setCurrency(this.form.get('currency').value);

    console.log(service);

    this.subscription_create = this.serviceService.create(service).subscribe(
      data => this.handleSuccess(data),
      err => console.log(err),
      () => console.log('Request complete!')
    );
  }

  handleSuccess(data): void {
    if (data.success) {
      this.toast.success('You are awesome!', 'Success!');
    }
    else {
      this.toast.error(data.message, 'Error!');
    }
  }

  ngOnInit(): void {
    this.subscription_getAll = this.currencyService.getAll().subscribe (
      data => this.currencies = data.result,
      err => console.log(err),
      () => console.log('Request complete!')
    );
  }

  ngOnDestroy(): void {
    this.subscription_create.unsubscribe();
    this.subscription_getAll.unsubscribe();
  }
}
