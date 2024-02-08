import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { Observable, from, filter, fromEvent, of } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterViewInit {
  title = "angular-observables";

  data: any[] = [];

  @ViewChild("createbtn")
  createBtn: ElementRef;

  createBtnObservable;

  arr1 = [1, 3, 4, 5, 7, 14, 16];
  arr2 = ["a", "b", "c", "d", "e"];

  // myObservable = new Observable((observer) => {
  //   observer.next(1);
  //   observer.next(2);
  //   observer.next(3);
  //   observer.error(new Error("Something went wrong. Please try again later!"));
  //   observer.next(4);
  //   observer.next(5);
  // });

  //myObservable = of(this.arr1, this.arr2);

  promiseData = new Promise((resolve, reject) => {
    resolve([10, 20, 30, 40, 50]);
  });

  myObservable = from([2, 4, 6, 8, 10]).pipe(
    map((val) => {
      return val * 5;
    }),
    filter((val) => {
      return val % 4 === 0;
    })
  );

  // transformedObserv = this.myObservable.pipe(
  //   map((val) => {
  //     return val * 5;
  //   }),
  //   filter((val) => {
  //     return val % 4 === 0;
  //   })
  // );

  // filteredObs = this.transformedObserv.pipe(
  //   filter((val) => {
  //     return val % 4 === 0;
  //   })
  // );

  GetDataAsync() {
    this.myObservable.subscribe({
      next: (v) => {
        this.data.push(v);
      },
      error: (e) => {
        alert(e.message);
        console.error(e);
      },
      complete: () => alert("All the data is streamed!"),
    });
  }

  // buttonClicked() {
  //   let counter: number = 0;

  //   this.createBtnObservable = fromEvent(
  //     this.createBtn.nativeElement,
  //     "click"
  //   ).subscribe((data) => {
  //     console.log(data);
  //     this.showItem(++counter);
  //   });
  // }

  ngAfterViewInit(): void {
    //this.buttonClicked();
  }

  // showItem(counter: number) {
  //   const div = document.createElement("div");
  //   div.innerText = "Item " + counter;
  //   div.className = "data-list";

  //   document.getElementById("container").appendChild(div);
  // }
}
