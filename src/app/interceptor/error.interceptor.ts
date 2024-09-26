import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {NotificationService} from "../service/notification.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      // If login is build in
      // if (err.status === 401) {
      //   this.authenticationService.logout();
      // }
      this.notificationService.error("Er is iets misgegaan!", err.error.error?.bericht ?? err.error.message ?? err.error.error ?? err.message);
      return throwError(() => new Error(err))
    }));
  }
}
