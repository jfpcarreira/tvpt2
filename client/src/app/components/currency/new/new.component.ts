import { Component, OnInit, OnDestroy }         from '@angular/core';
import { FormGroup, FormControl, Validators }   from '@angular/forms';
import { Router }                               from '@angular/router';
import { ToastrService }                        from 'ngx-toastr';
import { Subscription }                         from 'rxjs/Subscription';
import { Ng4LoadingSpinnerService }             from 'ng4-loading-spinner';
import { HandleHttpCall }                       from '../../../classes/abstract/handleHttpCall';
import { CurrencyService }                      from '../../../services/currency.service';
import { ICurrency }                            from '../../../interfaces/currency/icurrency';
import { IGenericResponse }                     from '../../../interfaces/igeneric-response';
import { Currency }                             from '../../../classes/currency';

@Component({
  selector: 'currency-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class CurrencyNewComponent extends HandleHttpCall implements OnInit, OnDestroy {

  public form: FormGroup;
  private subscription_create: Subscription;

  constructor(
      private toast: ToastrService
    , private currencyService: CurrencyService
    , private router: Router
    , private spinner: Ng4LoadingSpinnerService) {
      super(router, toast, spinner);
  }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    if(typeof this.subscription_create != "undefined") this.subscription_create.unsubscribe();
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
      symbol: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1)
      ]))
    });
  }

  // Function to submit form
  onSubmit(): void {
    this.spinner.show();
    //    this.disableForm();

    const currency = new Currency();
    currency.setCode(this.form.get('code').value);
    currency.setName(this.form.get('name').value);
    currency.setSymbol(this.form.get('symbol').value);

    this.subscription_create = this.currencyService.create(currency).subscribe(
        data => super.handleDataResponse(data, null, '/currencies')
      , err => {
          console.error(err);
          this.toast.error('Backend server is down. Please try again later.', 'Error!');
        }
    );
  }
}
