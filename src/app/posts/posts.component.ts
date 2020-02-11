import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadRequestError } from '../common/bad-request-error';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];

  // when I decorate it as private, I can access as a variable
  // from the class.
  constructor(private service: PostService) { }

  ngOnInit() {
    this.service.getPosts()
      .subscribe(res => {
        this.posts = res;
      }, err => {
        alert(err.errorDescription.status + ' ' + err.errorDescription.message)
      });
  }

  createPost(titleInput: HTMLInputElement) {
    let post: any = { title: titleInput.value };
    titleInput.value = ''

    this.service.createPost(post)
      .subscribe(res => {
        post['id'] = res.id;
        this.posts.splice(0, 0, post)
      }, (err: AppError) => {
        if (err instanceof BadRequestError) {
          alert(err.errorDescription.status + ' ' + err.errorDescription.message)
        } else {
          alert(err.errorDescription.status + ' ' + err.errorDescription.message)
        };
      });
  }

  updatePost(post) {
    this.service.updatePost(post)
      .subscribe(res => {
        console.log(res)
      }, (err: AppError) => {
        if (err instanceof NotFoundError) {
          alert(err.errorDescription.status + ' ' + err.errorDescription.message)
        } else if (err instanceof BadRequestError) {
          alert(err.errorDescription.status + ' ' + err.errorDescription.message)
        } else {
          alert(err.errorDescription.status + ' ' + err.errorDescription.message)
        };
      });
  }

  deletePost(post) {
    this.service.deletePost(post.id)
      .subscribe(res => {
        this.posts = this.posts.filter(p => p.id !== post.id);
      }, (err: AppError) => {
        if (err instanceof NotFoundError) {
          alert(err.errorDescription.status + ' ' + err.errorDescription.message)
        } else {
          alert(err.errorDescription.status + ' ' + err.errorDescription.message)
        };
      });
  }
}
