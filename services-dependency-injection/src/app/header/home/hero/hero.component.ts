import { Component, inject } from "@angular/core";
import { SubsribeService } from "src/app/Services/subscribe.service";

@Component({
  selector: "app-hero",
  templateUrl: "./hero.component.html",
})
export class HeroComponent {
  private subService = inject(SubsribeService);

  OnSubscribe() {
    this.subService.OnSubscribeClicked();
  }
}
