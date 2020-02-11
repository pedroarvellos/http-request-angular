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
      });
  }

  createPost(titleInput: HTMLInputElement) {
    let post: any = { title: titleInput.value };
    titleInput.value = ''

    this.service.createPost(post)
      .subscribe(res => {
        post['id'] = res.id;
        this.posts.splice(0, 0, post)
      });
  }

  updatePost(post) {
    this.service.updatePost(post)
      .subscribe(res => {
        console.log(res)
      })
  }

  deletePost(post) {
    this.service.deltePost(post.id)
      .subscribe(res => {
        this.posts = this.posts.filter(p => p.id !== post.id);
      })
  }
}
