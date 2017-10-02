import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService }                from 'ngx-toastr';
import { Subscription }                 from 'rxjs/Subscription';
import { Ng4LoadingSpinnerService }     from 'ng4-loading-spinner';
import { HandleHttpCall }               from '../../../classes/abstract/handleHttpCall';
import { CurrencyService }              from '../../../services/currency.service';
import { Currency }                     from '../../../classes/currency';
import { ICurrenciesResponse }          from '../../../interfaces/currency/icurrencies-response';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class CurrencyListComponent extends HandleHttpCall implements OnInit, OnDestroy {

  public currencies: Currency[];
  private subscription_getAll: Subscription;
  private subscription_delete: Subscription;

  constructor(
      private toast: ToastrService
    , private currencyService: CurrencyService
    , private spinner: Ng4LoadingSpinnerService) {
      super(null, toast, spinner);
    }

  ngOnInit(): void {
    this.subscription_getAll = this.currencyService.getAll().subscribe(
      data => {
        if (data.success) {
          this.currencies = data.result;
        } else {
          this.toast.error(data.message, 'Error!');
        }
      },
      err => {
        console.error(err);
        this.toast.error('Backend server is down. Please try again later.', 'Error!');
      }
    );
  }

  delete(currency: Currency): void {
    this.spinner.show();
    this.subscription_delete = this.currencyService.delete(currency.getId()).subscribe(
      data => {
        if (data.success) {
          this.currencies.splice( this.currencies.indexOf(currency), 1 );
          this.toast.success(data.message, 'Success!');
        } else {
          this.toast.error(data.message, 'Error!');
        }
        this.spinner.hide();
      },
      err => {
        console.error(err);
        this.toast.error('Backend server is down. Please try again later.', 'Error!');
        this.spinner.hide();
      }
    );
  }

  ngOnDestroy(): void {
    if(typeof this.subscription_getAll != "undefined") this.subscription_getAll.unsubscribe();
    if(typeof this.subscription_delete != "undefined") this.subscription_delete.unsubscribe();
  }
}
