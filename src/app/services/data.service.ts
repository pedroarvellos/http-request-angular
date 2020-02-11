import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadRequestError } from '../common/bad-request-error';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private url: string, private http: HttpClient) { }

  getAll() {
    return this.http.get<[]>(this.url)
    .pipe(
        map(res => res),
        catchError(this.handleError)
      );
  }

  create(resource) {
    return this.http.post<any>(this.url, JSON.stringify(resource))
    .pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  update(resource) {
    return this.http.patch<any>(`${this.url}/${resource.id}`, JSON.stringify({ isRead: true }))
    .pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  delete(id) {
    return this.http.delete<any>(`${this.url}d/${id}`)
      .pipe(
        map(res => res),
        catchError(this.handleError)
      )
  }

  private handleError(err: Response) {
    if(err.status === 400) {
      return throwError(new BadRequestError(err, 'Invalid data.'));
    } else if(err.status === 404) {
      return throwError(new NotFoundError(err, 'It was not possible to find endpoint.'));
    } else {
      return throwError(new AppError(err, 'Unexpected error.'));
    }
  }
}
