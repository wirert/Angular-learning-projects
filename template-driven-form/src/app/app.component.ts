import { Component, ElementRef, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "template-driven-form";
  @ViewChild("regForm") regForm: NgForm;

  genders = [
    { id: "check-male", value: "male", display: "Male" },
    { id: "check-female", value: "female", display: "Female" },
    { id: "check-other", value: "other", display: "Prefer not to say" },
  ];

  OnFormSubmitted() {
    console.log(this.regForm);
  }
}
