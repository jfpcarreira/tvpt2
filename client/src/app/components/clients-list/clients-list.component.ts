import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../../services/client.service';
import { Client } from '../../classes/client';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

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
          console.log(data.message);
        }
      },
      err => {
        console.error(err);
        this.toast.error('Backend server is down. Please try again later.', 'Error!');
      }
    )
  }

}
