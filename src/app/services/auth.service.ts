import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/auth';
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

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw new Error('Something went wrong; please try again later.');
  }
}
