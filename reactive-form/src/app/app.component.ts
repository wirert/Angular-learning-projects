import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "./Validators/noSpaceAllowed.validator";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "template-driven-form";

  reactiveForm: FormGroup;
  formStatus: string = "";
  formData: any = {};
  showDetails: boolean = false;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstname: new FormControl(null, [
        Validators.required,
        CustomValidators.noSpaceAllowed,
      ]),
      lastname: new FormControl(null, [
        Validators.required,
        CustomValidators.noSpaceAllowed,
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(
        null,
        Validators.required,
        CustomValidators.checkUsernameAsync
      ),
      birthdate: new FormControl(null),
      gender: new FormControl("male"),
      address: new FormGroup({
        street: new FormControl(null, Validators.required),
        country: new FormControl("Nepal", Validators.required),
        city: new FormControl(null),
        region: new FormControl(null),
        postal: new FormControl(null, Validators.required),
      }),
      skills: new FormArray([new FormControl(null, Validators.required)]),
      experience: new FormArray([]),
    });

    // this.reactiveForm.get("skills").valueChanges.subscribe((val) => {
    //   console.log(val);
    // });

    this.reactiveForm.statusChanges.subscribe((status) => {
      this.formStatus = status;
    });

    // this.reactiveForm.get("email").statusChanges.subscribe((stat) => {
    //   console.log(stat);
    // });
  }

  OnFormSubmitted() {
    this.formData = this.reactiveForm.value;
    this.showDetails = true;

    if (this.reactiveForm.valid) {
      this.reactiveForm.reset({
        firstname: null,
        lastname: null,
        email: null,
        birthdate: null,
        gender: "male",
        address: {
          street: null,
          country: "Nepal",
          city: null,
          region: null,
          postal: null,
        },
        skills: [],
        experience: [],
      });
    }
  }

  OnAddSkillClicked() {
    (<FormArray>this.reactiveForm.get("skills")).push(
      new FormControl(null, Validators.required)
    );
  }

  OnDeleteSkillClicked(index: number) {
    (<FormArray>this.reactiveForm.get("skills")).removeAt(index);
  }

  AddExperience() {
    const formGroup = new FormGroup({
      company: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required),
      exp: new FormControl(null, Validators.required),
      startdate: new FormControl(null, Validators.required),
      enddate: new FormControl(new Date()),
    });

    (<FormArray>this.reactiveForm.get("experience")).push(formGroup);
  }

  DeleteExperience(index: number) {
    (<FormArray>this.reactiveForm.get("experience")).removeAt(index);
  }

  GenerateUsername() {
    let username = "";
    const fName: string = this.reactiveForm.get("firstname").value;
    const lName: string = this.reactiveForm.get("lastname").value;
    const num = Math.floor(Math.random() * 1000);

    if (fName.length > 3) {
      username += fName.toLowerCase().slice(0, 3);
    } else {
      username += fName.toLowerCase();
    }

    if (lName.length > 3) {
      username += lName.toLowerCase().slice(0, 3);
    } else {
      username += lName.toLowerCase();
    }

    username += num;

    this.reactiveForm.get("username").setValue(username);

    //this.reactiveForm.patchValue({ username: username });
  }
}
