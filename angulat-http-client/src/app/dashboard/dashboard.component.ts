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
  editMode: boolean = false;
  selectedTask: Task;

  ngOnInit(): void {
    this.fetchAllTasks();
  }

  OpenCreateTaskForm() {
    this.editMode = false;
    this.showCreateTaskForm = true;
    this.selectedTask = {
      title: "",
      createdAt: "",
      assignedTo: "",
      desc: "",
      status: "",
      priority: "",
    };
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }

  CreateOrUpdateTask(task: Task) {
    if (this.editMode) {
      task.id = this.selectedTask.id;
      this.taskService.updateTask(task).subscribe(() => this.fetchAllTasks());
    } else {
      this.taskService.createTask(task).subscribe(() => this.fetchAllTasks());
    }
  }

  OnDeleteTaskClicked(id: string) {
    this.taskService.deleteTask(id).subscribe(() => this.fetchAllTasks());
  }

  OnEditTaskClicked(id: string | undefined) {
    this.editMode = true;
    this.showCreateTaskForm = true;

    this.selectedTask = this.taskList.find((t) => t.id === id);
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
