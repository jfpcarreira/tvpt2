import { Injectable }               from '@angular/core';
import { HttpErrorResponse }        from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService }            from 'ngx-toastr';
import { IGenericResponse }         from '../interfaces/igeneric-response';

@Injectable()
export class UtilsService {

  constructor(
      private toast: ToastrService
    , private spinner: Ng4LoadingSpinnerService) {
  }

  handleError(err: HttpErrorResponse) {
    this.toast.error('An unexpected error occurred. Please try again later.', 'Error!');
    if (err.error instanceof Error) {
      console.error("Client-side error occured. Error: " + err);
    } else {
      console.error("Server-side error occured. Error: " + err);
    }
  }

  handleOnComplete() {
    // Hide the loading spinner
    this.spinner.hide();
  }
}
