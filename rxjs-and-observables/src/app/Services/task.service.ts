import { Injectable, EventEmitter, inject } from "@angular/core";
import { Subject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class TaskService {
  // CreateTask: EventEmitter<string> = new EventEmitter<string>();

  CreateTask: Subject<string> = inject(Subject<string>);

  OnCreateTask(val: string) {
    this.CreateTask.next(val);
  }
}
