import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService }                from 'ngx-toastr';
import { Subscription }                 from 'rxjs/Subscription';
import { Ng4LoadingSpinnerService }     from 'ng4-loading-spinner';
import { ClientService }                from '../../../services/client.service';
import { Client }                       from '../../../classes/client';

@Component({
  selector: 'client-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ClientListComponent implements OnInit, OnDestroy {

  public clients: Client[];
  private subscription_getAll: Subscription;
  private subscription_delete: Subscription;

  constructor(
      private toast: ToastrService
    , private clientService: ClientService
    , private spinnerService: Ng4LoadingSpinnerService) {
  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.subscription_getAll = this.clientService.getAll().subscribe(
      data => {
        if (data.success) {
          this.clients = data.result;
        } else {
          this.toast.error(data.message, 'Error!');
        }
        this.spinnerService.hide();
      },
      err => {
        console.error(err);
        this.toast.error('Backend server is down. Please try again later.', 'Error!');
        this.spinnerService.hide();
      }
    );
  }

  delete(client: Client): void {
    this.spinnerService.show();
    this.subscription_delete = this.clientService.delete(client.getId()).subscribe(
      data => {
        if (data.success) {
          this.clients.splice( this.clients.indexOf(client), 1 );
          this.toast.success(data.message, 'Success!');
        } else {
          this.toast.error(data.message, 'Error!');
        }
        this.spinnerService.hide();
      },
      err => {
        console.error(err);
        this.toast.error('Backend server is down. Please try again later.', 'Error!');
        this.spinnerService.hide();
      }
    );
  }

  ngOnDestroy(): void {
    if(typeof this.subscription_getAll != "undefined") this.subscription_getAll.unsubscribe();
    if(typeof this.subscription_delete != "undefined") this.subscription_delete.unsubscribe();
  }
}
