import { Component, ElementRef, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "template-driven-form";

  firstName: string = "";
  lastName: string = "";
  birthDate: string = "";
  emailAddress: string = "";
  gender = "";
  userName = "";
  address = "";
  city = "";
  country = "";
  phoneNumber = "";
  postalCode: number = 0;
  region = "";
  isAgreed: boolean = false;

  @ViewChild("regForm") regForm: NgForm;

  genders = [
    { id: "check-male", value: "male", display: "Male" },
    { id: "check-female", value: "female", display: "Female" },
    { id: "check-other", value: "other", display: "Prefer not to say" },
  ];

  OnFormSubmitted() {
    this.firstName = this.regForm.value.firstname;
    this.lastName = this.regForm.value.lastname;
    this.phoneNumber = this.regForm.value.phoneNumber;
    this.emailAddress = this.regForm.value.email;
    this.userName = this.regForm.value.username;
    this.birthDate = this.regForm.value.birthDate;
    this.address = this.regForm.value.address.address1;
    this.city = this.regForm.value.address.city;
    this.gender = this.regForm.value.gender;
    this.country = this.regForm.value.address.country;
    this.postalCode = this.regForm.value.address.postalCode;
    this.region = this.regForm.value.address.region;
    this.isAgreed = this.regForm.value.agreement;

    // console.log(this.firstName + this.lastName);
    // console.log(this.regForm);
    this.regForm.form.reset();
    this.regForm.form.patchValue({
      gender: "male",
      address: {
        country: "Nepal",
      },
    });
  }

  GenerateUserName() {
    let username = "";

    if (this.regForm.value.firstname.length > 3) {
      username += this.regForm.value.firstname.slice(0, 3);
    } else {
      username += this.regForm.value.firstname;
    }

    if (this.regForm.value.lastname.length > 3) {
      username += this.regForm.value.lastname.slice(0, 3);
    } else {
      username += this.regForm.value.lastname;
    }

    let date = new Date(this.regForm.value.birthDate);
    username += date.getFullYear();

    this.regForm.value.username = username.toLowerCase();
    this.regForm.form.patchValue({ username: username.toLowerCase() });
  }
}
