import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Task } from "src/app/Models/Task";

@Component({
  selector: "app-task-details",
  templateUrl: "./task-details.component.html",
  styleUrls: ["./task-details.component.css"],
})
export class TaskDetailsComponent {
  @Output() CloseDetails: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() task: Task;

  OnCloseDetails() {
    this.CloseDetails.emit(false);
  }
}
