import { inject } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
  HttpEvent,
} from "@angular/common/http";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {
  authService: AuthService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({
          params: new HttpParams().set("auth", user.token),
        });

        return next.handle(modifiedReq);
      })
    );
  }
}
