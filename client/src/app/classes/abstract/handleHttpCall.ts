import { Router }                   from '@angular/router';
import { ToastrService }            from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { IGenericResponse }         from '../../interfaces/igeneric-response';

export abstract class HandleHttpCall {

  constructor(
      private _router: Router
    , private _toast: ToastrService
    , private _spinner: Ng4LoadingSpinnerService) {
  }

  handleDataResponse(data: IGenericResponse, myList?: Array<any>, path?: string) {
    // SUCCESS
    if(data.success) {
      // GET ALL
      if(data.result != null) {
        console.log("entrei aqui");
        myList = data.result;
      }
      // CREATE
      else if(path != null) {
        this._toast.success(data.message, 'Success!');
        this._router.navigate([path]);
      }
    }
    // ERROR
    else {
      this._toast.error(data.message, 'Error!');
    }

    // Hide the loading spinner
    this._spinner.hide();
  }

}
