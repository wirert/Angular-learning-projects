import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  fragmentObs: Subscription;

  ngOnInit(): void {
    this.fragmentObs = this.activeRoute.fragment.subscribe((data) => {
      this.JumpToSection(data);
    });
  }

  JumpToSection(section: string) {
    document.getElementById(section).scrollIntoView({ behavior: "smooth" });
  }

  ngOnDestroy(): void {
    this.fragmentObs.unsubscribe();
  }
}
