import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts: any[];
  private url = 'http://jsonplaceholder.typicode.com/posts';

  // when I decorate it as private, I can access as a variable
  // from the class.
  constructor(private http: HttpClient) {
    http.get<[]>(this.url)
      .subscribe(res => {
        this.posts = res;
      });
  }

  createPost(titleInput: HTMLInputElement) {
    let post: any = { title: titleInput.value };
    titleInput.value = ''

    this.http.post<any>(this.url, JSON.stringify(post))
      .subscribe(res => {
        post['id'] = res.id;
        this.posts.splice(0, 0, post)
      });
  }

  updatePost(post) {
    this.http.patch<any>(`${this.url}/${post.id}`, JSON.stringify({ isRead: true }))
      .subscribe(res => {
        console.log(res)
      })
  }

  deletePost(post) {
    this.http.delete<any>(`${this.url}/${post.id}`)
      .subscribe(res => {
        this.posts = this.posts.filter(p => p.id !== post.id);
      })
  }
}
