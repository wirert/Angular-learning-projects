import { Component, Inject } from "@angular/core";
import { UserService } from "src/app/Services/user.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
})
export class AdminComponent {
  constructor(private userService: UserService) {}

  name: string = "";
  gender: string = "Male";
  subType: string = "Yearly";
  status: string = "Active";

  CreateNewUser() {
    this.userService.CreateUser(
      this.name,
      this.gender,
      this.subType,
      this.status
    );
  }
}
