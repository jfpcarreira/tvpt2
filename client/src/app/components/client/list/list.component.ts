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

  constructor(
      private toast: ToastrService
    , private clientService: ClientService
    , private spinnerService: Ng4LoadingSpinnerService) {
  }

  todo(): void {
    console.log('todo');
  }

  teste(): void {
    this.spinnerService.show();
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
      err => {
        console.error(err);
        this.toast.error('Backend server is down. Please try again later.', 'Error!');
      }
    )
  }

  ngOnDestroy(): void {
    if(typeof this.subscription_getAll != "undefined") this.subscription_getAll.unsubscribe();
  }
}
