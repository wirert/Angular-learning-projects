import { Injectable, inject } from "@angular/core";
import { UserService } from "./user.service";

@Injectable({ providedIn: "root" })
export class AuthService {
  userService: UserService = inject(UserService);
  isLogged: boolean = false;

  login(username: string, password: string) {
    const user = this.userService.users.find(
      (u) => u.username === username && u.password === password
    );
    this.isLogged = user ? true : false;

    return user;
  }

  logout() {
    this.isLogged = false;
  }

  IsAuthenticated() {
    return this.isLogged;
  }
}
