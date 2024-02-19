import { Component, inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../Services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthResponse } from "../Model/AuthResponse";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);
  isLoginMode: boolean = true;
  isLoading = false;
  errorMessage: string | null = null;
  authObs: Observable<AuthResponse>;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  OnAuthFormSubmitted(form: NgForm) {
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;

    form.reset();

    if (this.isLoginMode) {
      this.authObs = this.authService.login(email, password);
    } else {
      this.authObs = this.authService.signUp(email, password);
    }

    this.authObs.subscribe({
      next: (res) => {
        this.isLoading = false;
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
