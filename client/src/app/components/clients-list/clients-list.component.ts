import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  clients;

  constructor(
    private clientService: ClientService
  ) {
    this.clients = this.clientService.getAllClients().subscribe(
      data => (data) => {
        if (data.success) {
          this.clients = data.result;
        }
        else {
          console.log(data.message);
        }
      },
      error => console.log(error)
    )
  }

  ngOnInit() {
  }

}
