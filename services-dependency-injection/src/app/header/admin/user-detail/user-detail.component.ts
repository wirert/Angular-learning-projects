import { Component, OnInit, inject } from "@angular/core";
import { User } from "src/app/Models/User";
import { UserService } from "src/app/Services/user.service";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
})
export class UserDetailComponent implements OnInit {
  selectedUser: User;
  userService = inject(UserService);

  ngOnInit() {
    this.userService.OnUserDetailsClicked.subscribe(
      (data: User) => (this.selectedUser = data)
    );
  }
}
