import { Component, inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../Services/auth.service";
import { Observable } from "rxjs";
import { AuthResponse } from "../Model/AuthResponse";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  isLoginMode: boolean = true;
  isLoading = false;
  errorMessage: string | null = null;
  authObs: Observable<AuthResponse>;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  OnAuthFormSubmitted(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    form.reset();

    this.authObs = this.isLoginMode
      ? this.authService.login(email, password)
      : this.authService.signUp(email, password);

    this.authObs.subscribe({
      next: (_) => {
        this.isLoading = false;
        this.router.navigate(["/dashboard"]);
      },
      error: (errMsg) => {
        this.isLoading = false;

        this.errorMessage = errMsg;
        this.hideSnackbar();
      },
    });
  }

  private hideSnackbar() {
    setTimeout(() => {
      this.errorMessage = null;
    }, 4500);
  }
}
