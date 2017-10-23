import { Injectable }               from '@angular/core';
import { HttpErrorResponse }        from '@angular/common/http';
import { Router }                   from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService }            from 'ngx-toastr';
import { IGenericResponse }         from '../interfaces/igeneric-response';

@Injectable()
export class UtilsService {

  constructor(
      private toast: ToastrService
    , private router: Router
    , private spinner: Ng4LoadingSpinnerService) {
  }

  handleError(err: HttpErrorResponse) {
    let errorTitle = 'Error!';
    let errorMessage = 'An unexpected error occurred. Please try again later.';

    // ERROR ON CLIENT SIDE
    if (err.error instanceof Error) {
      console.error("Client-side error occured. Error: ");
      console.error(err);
    }
    // ERROR ON SERVER SIDE
    else {
      // 401 - UNAUTHORIZED
      if (err.status == 401) {
        errorTitle = 'UNAUTHORIZED';
        errorMessage = 'You are not authorized to view this content. Please login to proceed.';
        localStorage.clear();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      }
      else {
        console.error("Server-side error occured. Error: ");
        console.error(err);
      }
    }

    this.toast.error(errorMessage, errorTitle);
    this.spinner.hide();
  }

  handleOnComplete() {
    this.spinner.hide();
  }
}
