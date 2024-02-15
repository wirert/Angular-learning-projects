import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Task } from "src/app/Models/Task";

@Component({
  selector: "app-create-task",
  templateUrl: "./create-task.component.html",
  styleUrls: ["./create-task.component.css"],
})
export class CreateTaskComponent implements AfterViewInit {
  @Input() isEditMode: boolean = false;

  @Input() selectedTask: Task;

  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  EmitTaskData: EventEmitter<Task> = new EventEmitter<Task>();

  @ViewChild("taskForm") taskForm: NgForm;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.taskForm.form.patchValue(this.selectedTask);
    }, 0);
  }

  OnCloseForm() {
    this.CloseForm.emit(false);
  }

  OnFormSubmitted(form: NgForm) {
    if (form.valid) {
      this.EmitTaskData.emit(form.value);
      this.CloseForm.emit(false);
    }
  }
}
