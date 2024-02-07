import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class SubsribeService {
  OnSubscribeClicked() {
    //add user to DB
    //give access to services and so on

    alert("Thank you for subscribing. You can access the services now.");
  }
}
