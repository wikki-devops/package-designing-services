import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = 'https://godparticles.uk/demo/database/package-insert.php';

  constructor(private http: HttpClient) {}

  submitFormData(data: any): Observable<any> {
    console.log('Submitting data to backend:', data);

    return this.http.post(this.apiUrl, data, { responseType: 'text' }).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError({ success: false, message: 'Failed to submit form' });
      })
    );
  }
}
