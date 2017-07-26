import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../classes/client';

@Component({
  selector: 'client-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ClientListComponent implements OnInit {

  public clients: Client[];

  constructor(private toast: ToastrService, private clientService: ClientService) {
  }

  todo() {
    console.log('todo');
  }

  ngOnInit() {
    this.clientService.getClients().subscribe(
      data => {
        if (data.success) {
          this.clients = data.result;
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

}
