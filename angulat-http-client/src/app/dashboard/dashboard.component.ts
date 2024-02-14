import { Component, OnInit, inject } from "@angular/core";
import { Task } from "../Models/Task";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
  showCreateTaskForm: boolean = false;
  http: HttpClient = inject(HttpClient);
  URL =
    "https://angularhttpclient-1c735-default-rtdb.europe-west1.firebasedatabase.app/";

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
}
