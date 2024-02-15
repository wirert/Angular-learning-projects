import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({ providedIn: "root" })
export class LoggingService {
  http: HttpClient = inject(HttpClient);
  URL =
    "https://angularhttpclient-1c735-default-rtdb.europe-west1.firebasedatabase.app/log.json";

  logError(statusCode: number, errorMsg: string, dateTime: Date) {
    const err = {
      statusCode,
      errorMsg,
      dateTime,
    };
    this.http.post(this.URL, err).subscribe();
  }

  fetchErrors() {
    this.http.get(this.URL).subscribe((data) => {
      console.log(data);
    });
  }
}
