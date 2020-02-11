import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

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
      },
      err => {
        alert('An unexpected error occured.')
      });
  }

  createPost(titleInput: HTMLInputElement) {
    let post: any = { title: titleInput.value };
    titleInput.value = ''

    this.service.createPost(post)
      .subscribe(res => {
        post['id'] = res.id;
        this.posts.splice(0, 0, post)
      },
      (err: Response) => {
        if(err.status === 400) {
          console.log(err);
        } else {
          console.log(err);
          alert('An unexpected error occured.')
        };
      });
  }

  updatePost(post) {
    this.service.updatePost(post)
      .subscribe(res => {
        console.log(res)
      },
      err => {
        alert('An unexpected error occured.')
      });
  }

  deletePost(post) {
    this.service.deletePost(post.id)
      .subscribe(res => {
        this.posts = this.posts.filter(p => p.id !== post.id);
      },
      (err: Response) => {
        if(err.status === 404) {
          console.log(err)
          alert('Post already deleted.')
        } else {
          console.log(err)
          alert('An unexpected error occured.')
        };
      });
  }
}
