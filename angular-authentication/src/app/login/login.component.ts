import { Component, inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../Services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);
  isLoginMode: boolean = true;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  OnAuthFormSubmitted(form: NgForm) {
    console.log(form.value);
    if (this.isLoginMode) {
      //login
    } else {
      this.authService.signUp(form.value.email, form.value.password).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => console.log(err),
      });
    }
    form.reset();
  }
}
