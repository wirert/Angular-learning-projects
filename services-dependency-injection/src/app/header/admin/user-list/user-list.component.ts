import { Component } from "@angular/core";
import { User } from "src/app/Models/User";
import { UserService } from "src/app/Services/user.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
})
export class UserListComponent {
  constructor(private userService: UserService) {}

  userList = this.userService.GetAllUsers();

  ShowUserDetails(user: User) {
    this.userService.OnShowUserDetails(user);
  }
}
