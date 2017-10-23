import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(localStorage.length > 0) {
      const authReq = req.clone({
        headers: req.headers.set('authorization', localStorage.getItem('token'))
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
