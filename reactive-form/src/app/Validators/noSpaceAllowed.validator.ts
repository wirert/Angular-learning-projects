import { AbstractControl, FormControl } from "@angular/forms";

export class CustomValidators {
  static noSpaceAllowed(control: FormControl) {
    if (control.value != null && control.value.includes(" ")) {
      return { noSpaceAllowed: true };
    }
    return null;
  }

  static checkUsernameAsync(control: AbstractControl): Promise<any> {
    return userNameAllowed(control.value);
  }
}

function userNameAllowed(username: string) {
  const takenNames = ["user", "1234", "peshopeshev"];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (takenNames.includes(username)) {
        resolve({ checkUsername: true });
      } else {
        resolve(null);
      }
    }, 1500);
  });
}
