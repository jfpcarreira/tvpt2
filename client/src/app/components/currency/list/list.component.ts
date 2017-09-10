import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService }                from 'ngx-toastr';
import { Subscription }                 from 'rxjs/Subscription';
import { CurrencyService }              from '../../../services';
import { Currency }                     from '../../../classes';
import { ICurrenciesResponse }          from '../../../interfaces';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class CurrencyListComponent implements OnInit, OnDestroy {

  public currencies: Currency[];
  private subscription_getAll: Subscription;

  constructor(private toast: ToastrService, private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.subscription_getAll = this.currencyService.getAll().subscribe(
      data => {
        if (data.success) {
          this.currencies = data.result;
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

  todo(): void {
    console.log('todo');
  }

  ngOnDestroy(): void {
    this.subscription_getAll.unsubscribe();
  }
}
