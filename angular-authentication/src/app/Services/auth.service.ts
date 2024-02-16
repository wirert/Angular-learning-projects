import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AuthResponse } from "../Model/AuthResponse";

@Injectable({ providedIn: "root" })
export class AuthService {
  private http: HttpClient = inject(HttpClient);

  signUp(email: string, password: string) {
    const body = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http.post<AuthResponse>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJbB-ujnlfOhElBJTLl3n4I8gaMyYf6fA",
      body
    );
  }
}
