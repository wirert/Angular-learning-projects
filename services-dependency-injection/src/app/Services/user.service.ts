import { User } from "../Models/User";

export class UserService {
  users: User[] = [
    new User("Steve Smith", "Male", "Monthly", "Active"),
    new User("Mery Jane", "Female", "Yearly", "Inactive"),
    new User("Mark Tyler", "Male", "Quaterly", "Active"),
  ];

  GetAllUsers(): User[] {
    return this.users;
  }

  CreateUser(name: string, gender: string, subType: string, status: string) {
    this.users.push(new User(name, gender, subType, status));
  }
}
