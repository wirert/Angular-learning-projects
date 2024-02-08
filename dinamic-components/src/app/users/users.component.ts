import { Component, OnInit } from "@angular/core";
import { User } from "../Models/User";
import { UserService } from "../Services/user.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  constructor(private userService: UserService) {}

  users: User[] = [];
  showConfirmDeleteComp = false;
  userToDelete: User;

  ngOnInit() {
    this.users = this.userService.users;
  }

  OnDeleteClicked(user: User) {
    this.showConfirmDeleteComp = true;
    this.userToDelete = user;
  }

  OnUserDeleteConfirmation(deleteUser: boolean) {
    this.showConfirmDeleteComp = false;
    if (deleteUser) {
      const userIndex = this.userService.users.indexOf(this.userToDelete);
      this.userService.users.splice(userIndex, 1);
    }
  }
}
