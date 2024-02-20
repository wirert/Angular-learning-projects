import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AuthResponse } from "../Model/AuthResponse";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "../Model/User";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private tokenExpireTimer: any;

  router: Router = inject(Router);
  user = new BehaviorSubject<User>(null);

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
        catchError(this.handleError),
        tap((res) => this.handleCreateUser(res))
      );
  }

  login(email: string, password: string) {
    const body = { email, password, returnSecureToken: true };

    return this.http
      .post<AuthResponse>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJbB-ujnlfOhElBJTLl3n4I8gaMyYf6fA",
        body
      )
      .pipe(
        catchError(this.handleError),
        tap((res) => this.handleCreateUser(res))
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["/login"]);
    localStorage.removeItem("user");

    if (this.tokenExpireTimer) {
      clearTimeout(this.tokenExpireTimer);
    }

    this.tokenExpireTimer = null;
  }

  autoLogin() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      return;
    }

    const loggedUser = new User(
      user.email,
      user.id,
      user._token,
      user._expiresIn
    );

    if (loggedUser.token) {
      this.user.next(loggedUser);

      const timerValue = user._expiresIn.getTime() - new Date().getTime();
      this.autoLogout(timerValue);
    }
  }

  autoLogout(expireTime: number) {
    this.tokenExpireTimer = setTimeout(() => {
      this.logout();
    }, expireTime);
  }

  private handleCreateUser(res: AuthResponse) {
    const inspireInTs = new Date().getTime() + +res.expiresIn * 1000;
    const inspireIn = new Date(inspireInTs);
    const user = new User(res.email, res.localId, res.idToken, inspireIn);

    this.user.next(user);
    this.autoLogout(+res.expiresIn * 1000);

    localStorage.setItem("user", JSON.stringify(user));
  }

  private handleError(err) {
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
      case "INVALID_EMAIL":
        errorMsg = "Invalid email.";
        break;
      case "USER_DISABLED":
        errorMsg = "The user account has been disabled by an administrator.";
        break;
      case "INVALID_LOGIN_CREDENTIALS":
        errorMsg = "Invalid email or password";
        break;
      default:
        errorMsg = "An unknown error has occurred.";
        break;
    }

    return throwError(() => errorMsg);
  }
}
