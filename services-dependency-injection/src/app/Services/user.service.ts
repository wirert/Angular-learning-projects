import { EventEmitter, Injectable } from "@angular/core";
import { User } from "../Models/User";
import { LoggerService } from "./logger.service";

@Injectable({ providedIn: "root" })
export class UserService {
  private users: User[] = [
    new User("Steve Smith", "Male", "Monthly", "Active"),
    new User("Mery Jane", "Female", "Yearly", "Inactive"),
    new User("Mark Tyler", "Male", "Quaterly", "Active"),
  ];

  constructor(private logger: LoggerService) {}

  OnUserDetailsClicked: EventEmitter<User> = new EventEmitter<User>();

  OnShowUserDetails(user: User) {
    this.OnUserDetailsClicked.emit(user);
  }

  GetAllUsers(): User[] {
    return this.users;
  }

  CreateUser(name: string, gender: string, subType: string, status: string) {
    this.users.push(new User(name, gender, subType, status));
    this.logger.LogMessage(name, status);
  }
}
