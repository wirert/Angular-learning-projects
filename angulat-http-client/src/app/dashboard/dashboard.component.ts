import { Component, OnInit, inject } from "@angular/core";
import { Task } from "../Models/Task";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  showCreateTaskForm: boolean = false;
  http: HttpClient = inject(HttpClient);
  URL =
    "https://angularhttpclient-1c735-default-rtdb.europe-west1.firebasedatabase.app/";

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
    const headers = new HttpHeaders({
      "my-header": "Hello",
    });

    this.http
      .post<{ name: string }>(this.URL + "tasks.json", task, {
        headers: headers,
      })
      .subscribe({ error: console.error });
  }

  OnFetchTasksClicked() {
    this.fetchAllTasks();
  }

  private fetchAllTasks() {
    this.http
      .get<{ [key: string]: Task }>(this.URL + "tasks.json")
      .pipe(
        map((response) => {
          let tasks: Task[] = [];
          Object.entries(response).forEach(([key, value]) => {
            tasks.push({ ...value, id: key });
          });
          return tasks;
        })
      )
      .subscribe((tasks) => {
        this.taskList = tasks;
      });
  }
}
