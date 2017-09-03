import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CurrencyService } from '../../../services/currency.service';
import { Currency } from '../../../classes/currency';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class CurrencyListComponent implements OnInit {

  public currencies: Currency[];

  constructor(private toast: ToastrService, private currencyService: CurrencyService) {
  }

  ngOnInit() {
    this.currencyService.getAll().subscribe(
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
    )
  }

  todo() {
    console.log('todo');
  }

}
