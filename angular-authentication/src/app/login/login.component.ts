import { Component, inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../Services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";

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

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  OnAuthFormSubmitted(form: NgForm) {
    console.log(form.value);
    this.isLoading = true;
    if (this.isLoginMode) {
      //login
      this.isLoading = false;
    } else {
      this.authService.signUp(form.value.email, form.value.password).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
        },
        error: (errMsg) => {
          this.isLoading = false;
          this.errorMessage = errMsg;
          this.hideSnackbar();
        },
      });
    }

    form.reset();
  }

  private hideSnackbar() {
    setTimeout(() => {
      this.errorMessage = null;
    }, 4500);
  }
}
