import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router }                   from '@angular/router';
import { ToastrService }                from 'ngx-toastr';
import { Subscription }                 from 'rxjs/Subscription';
import { CurrencyService }              from '../../../services/currency.service';
import { UtilsService }                 from '../../../services/utils.service';
import { Currency }                     from '../../../classes/currency';
import { ICurrenciesResponse }          from '../../../interfaces/currency/icurrencies-response';
import { IGenericResponse }             from '../../../interfaces/igeneric-response';

@Component({
  selector: 'currency-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class CurrencyListComponent implements OnInit, OnDestroy {

  public currencies: Currency[];
  private subscription_getAll: Subscription;
  private subscription_delete: Subscription;

  constructor(
      private toast: ToastrService
    , private router: Router
    , private currencyService: CurrencyService
    , private utils: UtilsService) {
  }

  ngOnInit(): void {
    this.subscription_getAll = this.currencyService.getAll().subscribe(
      data  => this.handleDataGet(data),
      err   => this.utils.handleError(err),
      ()    => this.utils.handleOnComplete()
    );
  }

  handleDataGet(data: IGenericResponse) {
    // SUCCESS
    if(data.success) {
      this.currencies = data.result
    }
    // ERROR
    else {
      this.toast.error(data.message, 'Error!');
    }
  }

  delete(currency: Currency): void {
    this.subscription_delete = this.currencyService.delete(currency.getId()).subscribe(
      data  => this.handleDataDelete(data, currency),
      err   => this.utils.handleError(err),
      ()    => this.utils.handleOnComplete()
    );
  }

  handleDataDelete(data: IGenericResponse, currency: Currency) {
    // SUCCESS
    if(data.success) {
      this.currencies.splice( this.currencies.indexOf(currency), 1 );
      this.toast.success(data.message, 'Success!');
    }
    // ERROR
    else {
      this.toast.error(data.message, 'Error!');
    }
  }

  ngOnDestroy(): void {
    if(typeof this.subscription_getAll != "undefined") this.subscription_getAll.unsubscribe();
    if(typeof this.subscription_delete != "undefined") this.subscription_delete.unsubscribe();
  }
}
