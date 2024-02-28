import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { AuthService } from "../Services/auth.service";
import { Subscription } from "rxjs";
import { User } from "../Model/User";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  authService: AuthService = inject(AuthService);
  isLogged = false;
  private userSubject: Subscription;

  ngOnInit(): void {
    this.userSubject = this.authService.user.subscribe((user: User) => {
      this.isLogged = user ? true : false;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubject.unsubscribe();
  }
}
