import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "template-driven-form";

  reactiveForm: FormGroup;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null),
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
    });
  }

  OnFormSubmitted() {
    console.log(this.reactiveForm);
  }

  OnAddSkillClicked() {
    (<FormArray>this.reactiveForm.get("skills")).push(
      new FormControl(null, Validators.required)
    );
  }

  OnDeleteSkillClicked(index: number) {
    (<FormArray>this.reactiveForm.get("skills")).removeAt(index);
  }
}
