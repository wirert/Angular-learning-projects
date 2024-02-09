import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from "@angular/core";
import { User } from "../Models/User";
import { UserService } from "../Services/user.service";
import { ConfirmDeleteComponent } from "./confirm-delete/confirm-delete.component";
import { ViewContainer } from "../viewContainer.directive";
import { Subscription } from "rxjs";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  constructor(
    private userService: UserService,
    private compFactResolver: ComponentFactoryResolver
  ) {}

  users: User[] = [];
  showConfirmDeleteComp = false;
  userToDelete: User;

  @ViewChild(ViewContainer, { static: false }) container: ViewContainer;

  onConfirmObs: Subscription;

  ngOnInit() {
    this.users = this.userService.users;
  }

  OnDeleteClicked(user: User) {
    // this.showConfirmDeleteComp = true;
    this.userToDelete = user;

    this.showConfirmDelete(this.userToDelete);
  }

  OnUserDeleteConfirmation(deleteUser: boolean) {
    this.showConfirmDeleteComp = false;
    if (deleteUser) {
      const userIndex = this.userService.users.indexOf(this.userToDelete);
      this.userService.users.splice(userIndex, 1);
    }
  }

  showConfirmDelete(user: User) {
    const confirmDelCompFactory = this.compFactResolver.resolveComponentFactory(
      ConfirmDeleteComponent
    );

    const containerViewRef = this.container.viewContainer;
    containerViewRef.clear();

    const componentRef = containerViewRef.createComponent(
      confirmDelCompFactory
    );

    componentRef.instance.userToDelete = user;
    this.onConfirmObs = componentRef.instance.OnConfirmation.subscribe(
      (deleteUser: boolean) => {
        this.onConfirmObs.unsubscribe();
        containerViewRef.clear();

        if (deleteUser) {
          const userIndex = this.userService.users.indexOf(this.userToDelete);
          this.userService.users.splice(userIndex, 1);
        }
      }
    );
  }
}
