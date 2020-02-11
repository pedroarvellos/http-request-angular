import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadRequestError } from '../common/bad-request-error';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<[]>(this.url);
  }

  createPost(post) {
    return this.http.post<any>(this.url, JSON.stringify(post))
    .pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  updatePost(post) {
    return this.http.patch<any>(`${this.url}/${post.id}`, JSON.stringify({ isRead: true }))
    .pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  deletePost(id) {
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
      return throwError(new NotFoundError(err, 'It was not possible to find post.'));
    } else {
      return throwError(new AppError(err, 'Unexpected error.'));
    }
  }
}
