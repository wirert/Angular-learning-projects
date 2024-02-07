import { Component } from "@angular/core";
import { SubsribeService } from "./Services/subscribe.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [SubsribeService],
})
export class AppComponent {
  title = "angular-services-dependency-injection";
}
