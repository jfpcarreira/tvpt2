import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService }                from 'ngx-toastr';
import { Subscription }                 from 'rxjs/Subscription';
import { ServiceService }               from '../../../services/service.service';
import { CurrencyService }              from '../../../services/currency.service';
import { Service }                      from '../../../classes/service';

@Component({
  selector: 'service-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ServiceListComponent implements OnInit, OnDestroy {

  public services: Service[];
  private subscription_getAll: Subscription;

  constructor(
    private toast: ToastrService,
    private serviceService: ServiceService,
    private currencyService: CurrencyService
  ) { }

  todo(): void {
    console.log('todo');
  }

  ngOnInit(): void {
    this.subscription_getAll = this.serviceService.getAll().subscribe(
      data => {
        if (data.success) {
          this.services = data.result;
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
    this.subscription_getAll.unsubscribe();
  }
}
