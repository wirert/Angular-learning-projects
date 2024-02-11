import { Component } from "@angular/core";
import { IDeactivateComponent } from "../Services/authguard.service";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements IDeactivateComponent {
  firstName: string = "";
  lastName: string = "";
  country: string = "";
  message: string = "";

  isSubmitted: boolean = false;

  OnSubmit() {
    this.isSubmitted = true;
    this.firstName = "";
    this.lastName = "";
    this.country = "";
    this.message = "";
  }

  canExit() {
    if (
      (this.firstName || this.lastName || this.country || this.message) &&
      !this.isSubmitted
    ) {
      return confirm("You have unsaved changes. Do you want to navigate away?");
    }

    return true;
  }
}
