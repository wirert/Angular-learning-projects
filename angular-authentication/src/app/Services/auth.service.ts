import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AuthResponse } from "../Model/AuthResponse";
import { catchError, throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  private http: HttpClient = inject(HttpClient);

  signUp(email: string, password: string) {
    const body = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http
      .post<AuthResponse>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJbB-ujnlfOhElBJTLl3n4I8gaMyYf6fA",
        body
      )
      .pipe(
        catchError((err) => {
          let errorMsg = "";

          if (!err.error || !err.error.error) {
            errorMsg = "An unknown error has occurred.";
            return throwError(() => errorMsg);
          }

          switch (err.error.error.message) {
            case "EMAIL_EXISTS":
              errorMsg = "User with this email already exist.";
              break;
            case "OPERATION_NOT_ALLOWED":
              errorMsg = "This operation is not allowed.";
              break;
            case "TOO_MANY_ATTEMPTS_TRY_LATER":
              errorMsg = "Too many attempts. Try later.";
              break;
          }

          return throwError(() => errorMsg);
        })
      );
  }
}
