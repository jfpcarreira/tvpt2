import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService }                from 'ngx-toastr';
import { Subscription }                 from 'rxjs/Subscription';
import { ServiceService }               from '../../../services/service.service';
import { CurrencyService }              from '../../../services/currency.service';
import { UtilsService }                 from '../../../services/utils.service';
import { Service }                      from '../../../classes/service';

@Component({
  selector: 'service-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ServiceListComponent implements OnInit, OnDestroy {

  public services: Service[];
  private subscription_getAll: Subscription;
  private subscription_delete: Subscription;

  constructor(
      private toast: ToastrService
    , private serviceService: ServiceService
    , private currencyService: CurrencyService
    , private utils: UtilsService) {
  }

  ngOnInit(): void {
    this.subscription_getAll = this.serviceService.getAll().subscribe(
      data => {
        if (data.success) {
          this.services = data.result;
        } else {
          this.toast.error(data.message, 'Error!');
        }
      },
      err => this.utils.handleError(err),
      () => this.utils.handleOnComplete()
    );
  }

  delete(service: Service): void {
    this.subscription_delete = this.currencyService.delete(service.getId()).subscribe(
      data => {
        if (data.success) {
          this.services.splice( this.services.indexOf(service), 1 );
          this.toast.success(data.message, 'Success!');
        } else {
          this.toast.error(data.message, 'Error!');
        }
      },
      err => this.utils.handleError(err),
      () => this.utils.handleOnComplete()
    );
  }

  ngOnDestroy(): void {
    if(typeof this.subscription_getAll != "undefined") this.subscription_getAll.unsubscribe();
    if(typeof this.subscription_delete != "undefined") this.subscription_delete.unsubscribe();
  }
}
