import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError, tap} from 'rxjs';
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const idToken = localStorage.getItem("token");

    /*
    If we have a token in local storage (= logged in), include the token in every http request
    401 errors mean the token is no longer valid and re-route to the login page
    */
    const cloned = idToken ? request.clone({
      headers: request.headers.set("Authorization",
        "Bearer " + idToken)
    }) : request.clone();

    return next.handle(cloned).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.status >= 200 && event.status < 300) {
            const authHeader = event.headers.get("authorization");
            if (authHeader?.startsWith("Bearer ")) {
              const token: string = authHeader?.substring(7);
              this.authService.setToken(token);
              this.authService.setGroups();
            }
          }
        }
      }),
      catchError(error=>{
        if(error.status===401)
        {
            this.router.navigate(["login"]);
        }
        return throwError(()=>new Error(error.status + ' token invalid'));
      }
    ));
  }
}
