import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../../services/service.service';
import { Service } from '../../../classes/service';

@Component({
  selector: 'service-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ServiceListComponent implements OnInit {

  public services: Service[];

  constructor(private toast: ToastrService, private serviceService: ServiceService) {
  }

  todo() {
    console.log('todo');
  }

  ngOnInit() {
    this.serviceService.getServices().subscribe(
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
    )
  }

}
