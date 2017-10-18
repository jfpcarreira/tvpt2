import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService }                from 'ngx-toastr';
import { Subscription }                 from 'rxjs/Subscription';
import { ClientService }                from '../../../services/client.service';
import { UtilsService }                 from '../../../services/utils.service';
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
      , private utils: UtilsService) {
  }

  ngOnInit(): void {
    this.subscription_getAll = this.clientService.getAll().subscribe(
      data => {
        if (data.success) {
          this.clients = data.result;
        } else {
          this.toast.error(data.message, 'Error!');
        }
      },
      err => this.utils.handleError(err),
      () => this.utils.handleOnComplete()
    );
  }

  delete(client: Client): void {
    this.subscription_delete = this.clientService.delete(client.getId()).subscribe(
      data => {
        if (data.success) {
          this.clients.splice( this.clients.indexOf(client), 1 );
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
