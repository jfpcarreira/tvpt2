import { Component, OnInit, OnDestroy }         from '@angular/core';
import { FormGroup, FormControl, Validators }   from '@angular/forms';
import { ToastrService }                        from 'ngx-toastr';
import { Subscription }                         from 'rxjs/Subscription';
import { CurrencyService }                      from '../../../services/currency.service';
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
  public processing: Boolean = false;
  private subscription_create: Subscription;

  constructor(private toast: ToastrService, private currencyService: CurrencyService) {
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
      symbol: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1)
      ]))
    });
  }

  ngOnInit(): void {
  }

  // Function to submit form
  onSubmit(): void {
    this.processing = true;
    //    this.disableForm();

    let currency = new Currency();
    currency.setCode(this.form.get('code').value);
    currency.setName(this.form.get('name').value);
    currency.setSymbol(this.form.get('symbol').value);

    this.subscription_create = this.currencyService.create(currency).subscribe(
      data => {
        if (data.success) {
          this.toast.success('Currency successfuly created!', 'Success!');
        }
        else {
          this.toast.error(data.message, 'Error!');
        }
      },
      err => {
        console.error(err);
        this.toast.error('Backend server is down. Please try again later.', 'Error!');
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription_create.unsubscribe();
  }
}
