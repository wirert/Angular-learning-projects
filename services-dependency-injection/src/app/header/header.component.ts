import { Component } from "@angular/core";
import { SubsribeService } from "../Services/subscribe.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  //providers: [SubsribeService],
})
export class HeaderComponent {
  selectedTab: string = "home";

  constructor(private subService: SubsribeService) {}

  //When HOME Link is clicked
  HomeClicked() {
    this.selectedTab = "home";
  }

  //When Admin Link is clicked
  AdminClicked() {
    this.selectedTab = "admin";
  }

  OnSubscribe() {
    this.subService.OnSubscribeClicked();
  }
}
