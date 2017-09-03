import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CurrencyService } from '../../../services/currency.service';
import { ICurrency } from '../../../interfaces/price/icurrency';
import { Currency } from '../../../classes/currency';

@Component({
  selector: 'currency-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class CurrencyNewComponent implements OnInit {

  form: FormGroup;
  processing: Boolean = false;

  constructor(private toast: ToastrService, private currencyService: CurrencyService) {
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
      symbol: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1)
      ]))
    });
  }

  ngOnInit() {
  }

  // Function to submit form
  onSubmit() {
    this.processing = true;
    //    this.disableForm();

    let currency = new Currency();
    currency.setCode(this.form.get('code').value);
    currency.setName(this.form.get('name').value);
    currency.setSymbol(this.form.get('symbol').value);

    this.currencyService.create(currency).subscribe(
      data => this.handleSuccess(data),
      err => console.log(err),
      () => console.log('Request complete!')
    );
  }

  handleSuccess(data) {
    if (data.success) {
      this.toast.success('Currency successfuly created!', 'Success!');
    }
    else {
      this.toast.error(data.message, 'Error!');
    }
  }
}