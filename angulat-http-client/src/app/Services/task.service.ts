import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Task } from "../Models/Task";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { LoggingService } from "./logging.service";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  http: HttpClient = inject(HttpClient);
  URL =
    "https://angularhttpclient-1c735-default-rtdb.europe-west1.firebasedatabase.app/";

  logger: LoggingService = inject(LoggingService);

  createTask(task: Task) {
    const headers = new HttpHeaders({
      "my-header": "Hello",
    });

    return this.http.post<{ name: string }>(this.URL + "tasks.json", task, {
      headers: headers,
    });
  }

  updateTask(task: Task) {
    return this.http.put(`${this.URL}tasks/${task.id}.json`, task).pipe(
      catchError((err) => {
        this.logger.logError(err.status, err.message, new Date());
        return throwError(() => err);
      })
    );
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.URL}tasks/${id}.json`).pipe(
      catchError((err) => {
        this.logger.logError(err.status, err.message, new Date());
        return throwError(() => err);
      })
    );
  }

  deleteAll() {
    return this.http.delete(`${this.URL}tasks.json`).pipe(
      catchError((err) => {
        this.logger.logError(err.status, err.message, new Date());
        return throwError(() => err);
      })
    );
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.URL}tasks/${id}.json`).pipe(
      map((res) => {
        if (res) {
          res.id = id;
          return res;
        }

        return new Task("", "", "", "", "", "");
      }),
      catchError((err) => {
        this.logger.logError(err.status, err.message, new Date());
        return throwError(() => err);
      })
    );
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
      }),
      catchError((err) => {
        this.logger.logError(err.status, err.message, new Date());
        return throwError(() => err);
      })
    );
  }
}
