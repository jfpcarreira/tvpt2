import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../../services/service.service';
import { CurrencyService } from '../../../services/currency.service';
import { IService } from '../../../interfaces/service/iservice';
import { Service } from '../../../classes/service';
import { Currency } from '../../../classes/currency';

@Component({
  selector: 'service-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class ServiceNewComponent implements OnInit {

  form: FormGroup;
  processing: Boolean = false;
  currencies: Currency[];

  constructor(private toast: ToastrService, private serviceService: ServiceService, private currencyService: CurrencyService) {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      code: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3)
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      price: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(0)
      ]))
    });
  }

  // Function to submit form
  onSubmit() {
    this.processing = true;
    //    this.disableForm();

    let service = new Service();
    service.setCode(this.form.get('code').value);
    service.setName(this.form.get('name').value);
    service.setPrice(this.form.get('price').value); // Mudar HTML para suportar currency e criar objectos Currency

    this.serviceService.create(service).subscribe(
      data => this.handleSuccess(data),
      err => console.log(err),
      () => console.log('Request complete!')
    );
  }

  handleSuccess(data) {
    if (data.success) {
      this.toast.success('You are awesome!', 'Success!');
    }
    else {
      this.toast.error(data.message, 'Error!');
    }
  }

  ngOnInit() {
/*     this.currencyService.getAll().subscribe (
      data => this.currencies = data.result,
      err => console.log(err),
      () => console.log('Request complete!')
    );
 */  }

}
