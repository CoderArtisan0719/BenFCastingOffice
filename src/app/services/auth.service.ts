import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, } from 'rxjs';
import { catchError, tap, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api/auth';
  private authSubject = new BehaviorSubject<boolean>(false);
  authStatus$ = this.authSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('authToken', response.token);
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.authSubject.next(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  private checkToken(): void {
    const token = localStorage.getItem('authToken');
    this.authSubject.next(!!token);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Er is een onbekende fout opgetreden';

    if (error.error.message) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      if (error.error && error.error.error) {
        errorMessage = error.error.error;
      } else if (error.status === 0) {
        errorMessage = 'Kan geen verbinding maken met de server';
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
