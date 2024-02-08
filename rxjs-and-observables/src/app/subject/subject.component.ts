import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ajax } from "rxjs/ajax";

@Component({
  selector: "app-subject",
  templateUrl: "./subject.component.html",
  styleUrls: ["./subject.component.css"],
})
export class SubjectComponent implements OnInit {
  ngOnInit(): void {
    //const obs = new Observable((observer) => observer.next(Math.random()));
    //const subject = new Subject<number>();
    const subject = new BehaviorSubject<number>(100);

    subject.subscribe((data) => console.log("first: " + data));
    subject.subscribe((data) => console.log("second: " + data));

    subject.next(2222);

    //receives the last emitted value
    subject.subscribe((data) => console.log("third: " + data));

    // const dataObs = ajax("https://randomuser.me/api/");
    // const subject = new Subject();

    // subject.subscribe((res) => console.log(res));
    // subject.subscribe((res) => console.log(res));
    // subject.subscribe((res) => console.log(res));

    // dataObs.subscribe(subject);
  }
}
