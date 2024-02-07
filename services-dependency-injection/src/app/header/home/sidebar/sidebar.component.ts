import { Component } from "@angular/core";
import { SubsribeService } from "src/app/Services/subscribe.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent {
  constructor(private subService: SubsribeService) {}

  OnSubscribe() {
    this.subService.OnSubscribeClicked();
  }
}
