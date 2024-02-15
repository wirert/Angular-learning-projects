import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Task } from "../Models/Task";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  http: HttpClient = inject(HttpClient);
  URL =
    "https://angularhttpclient-1c735-default-rtdb.europe-west1.firebasedatabase.app/";

  createTask(task: Task) {
    const headers = new HttpHeaders({
      "my-header": "Hello",
    });

    return this.http.post<{ name: string }>(this.URL + "tasks.json", task, {
      headers: headers,
    });
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.URL}tasks/${id}.json`);
  }

  deleteAll() {
    return this.http.delete(`${this.URL}tasks.json`);
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<{ [key: string]: Task }>(this.URL + "tasks.json").pipe(
      map((response) => {
        let tasks: Task[] = [];

        if (response) {
          Object.entries(response).forEach(([key, value]) => {
            tasks.push({ ...value, id: key });
          });
        }
        return tasks;
      })
    );
  }
}
