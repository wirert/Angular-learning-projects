import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";
import { AuthService } from "../Services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  @ViewChild("username") username: ElementRef;
  @ViewChild("password") password: ElementRef;

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  queryObs: Subscription;

  ngOnInit(): void {
    this.queryObs = this.activeRoute.queryParamMap.subscribe((queries) => {
      const logout = Boolean(queries.get("logout"));
      if (logout) {
        this.authService.logout();
        alert("You logged out successfully.");
      }
    });
  }

  OnLoginClicked() {
    const user = this.authService.login(
      this.username.nativeElement.value,
      this.password.nativeElement.value
    );

    if (!user) {
      alert("Invalid username or password!");
    } else {
      alert(`Welcom ${user.name}. You are logged in.`);
      this.router.navigate(["/courses"]);
    }
  }
}
