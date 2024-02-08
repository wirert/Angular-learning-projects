import { Component } from "@angular/core";
import { Observable, Subscription, interval } from "rxjs";

@Component({
  selector: "app-unsubscribe",
  templateUrl: "./unsubscribe.component.html",
  styleUrls: ["./unsubscribe.component.css"],
})
export class UnsubscribeComponent {
  counter = interval(1000);
  data: number[] = [];
  subscriber1: Subscription;

  OnSubscibe() {
    this.subscriber1 = this.counter.subscribe((val) => {
      this.data.push(val);
    });
  }

  OnUnsubscribe() {
    this.subscriber1.unsubscribe();
  }
}
