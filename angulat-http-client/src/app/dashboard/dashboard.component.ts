import { Component, OnInit, inject } from "@angular/core";
import { Task } from "../Models/Task";
import { map } from "rxjs/operators";
import { TaskService } from "../Services/task.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  showCreateTaskForm: boolean = false;
  taskService: TaskService = inject(TaskService);

  taskList: Task[] = [];

  ngOnInit(): void {
    this.fetchAllTasks();
  }

  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }

  CreateTask(task: Task) {
    this.taskService.createTask(task).subscribe(() => this.fetchAllTasks());
  }

  OnDeleteTaskClicked(id: string) {
    this.taskService.deleteTask(id).subscribe(() => this.fetchAllTasks());
  }

  DeleteAllTasks() {
    this.taskService.deleteAll().subscribe(() => this.fetchAllTasks());
  }

  private fetchAllTasks() {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.taskList = tasks;
    });
  }
}
