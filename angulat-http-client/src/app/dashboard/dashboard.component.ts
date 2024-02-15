import { Component, OnInit, inject } from "@angular/core";
import { Task } from "../Models/Task";
import { TaskService } from "../Services/task.service";
import { HttpErrorResponse } from "@angular/common/http";

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
  isLoading: boolean = false;
  errorMessage: string | null = null;

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
      this.taskService.createTask(task).subscribe({
        next: () => this.fetchAllTasks(),
        error: (err) => this.setErrorMessage(err),
      });
    }
  }

  OnDeleteTaskClicked(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.fetchAllTasks(),
      error: (err) => this.setErrorMessage(err),
    });
  }

  OnEditTaskClicked(id: string | undefined) {
    this.editMode = true;
    this.showCreateTaskForm = true;

    this.selectedTask = this.taskList.find((t) => t.id === id);
  }

  DeleteAllTasks() {
    this.taskService.deleteAll().subscribe({
      next: () => this.fetchAllTasks(),
      error: (err) => this.setErrorMessage(err),
    });
  }

  private fetchAllTasks() {
    this.isLoading = true;
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.taskList = tasks;
        this.isLoading = false;
      },
      error: (err) => {
        this.setErrorMessage(err);
        this.isLoading = false;
      },
    });
  }

  private setErrorMessage(err: HttpErrorResponse) {
    if (err.status === 401) {
      this.errorMessage = "You don't have permission to perform this action!";
    } else {
      this.errorMessage = `${err.status} ${err.statusText}`;
    }

    setTimeout(() => {
      this.errorMessage = null;
    }, 4000);
  }
}
