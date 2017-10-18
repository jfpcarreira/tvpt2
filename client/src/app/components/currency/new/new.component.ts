import { Component, OnInit, OnDestroy }         from '@angular/core';
import { FormGroup, FormControl, Validators }   from '@angular/forms';
import { Router }                               from '@angular/router';
import { ToastrService }                        from 'ngx-toastr';
import { Subscription }                         from 'rxjs/Subscription';
import { CurrencyService }                      from '../../../services/currency.service';
import { UtilsService }                         from '../../../services/utils.service';
import { ICurrency }                            from '../../../interfaces/currency/icurrency';
import { IGenericResponse }                     from '../../../interfaces/igeneric-response';
import { Currency }                             from '../../../classes/currency';

@Component({
  selector: 'currency-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class CurrencyNewComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  private subscription_create: Subscription;

  constructor(
      private toast: ToastrService
    , private router: Router
    , private currencyService: CurrencyService
    , private utils: UtilsService) {
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
    //    this.disableForm();

    const currency = new Currency();
    currency.setCode(this.form.get('code').value);
    currency.setName(this.form.get('name').value);
    currency.setSymbol(this.form.get('symbol').value);

    this.subscription_create = this.currencyService.create(currency).subscribe(
        data  => this.handleData(data)
      , err   => this.utils.handleError(err)
      , ()    => this.utils.handleOnComplete()
    );
  }

  handleData(data: IGenericResponse) {
    // SUCCESS
    if(data.success) {
      this.toast.success(data.message, 'Success!');
      this.router.navigate(['/currencies']);
    }
    // ERROR
    else {
      this.toast.error(data.message, 'Error!');
    }
  }

}
