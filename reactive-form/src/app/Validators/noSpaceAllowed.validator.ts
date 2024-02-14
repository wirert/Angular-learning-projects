import { FormControl } from "@angular/forms";

export class CustomValidators {
  static noSpaceAllowed(control: FormControl) {
    if (control.value != null && control.value.includes(" ")) {
      return { noSpaceAllowed: true };
    }
    return null;
  }
}
