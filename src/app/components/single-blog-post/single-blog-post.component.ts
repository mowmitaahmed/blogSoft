import { Component, OnInit, OnDestroy } from '@angular/core';
import {BlogService} from '../../services/blogs/blog.service';
import { ActivatedRoute, Routes } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-blog-post',
  templateUrl: './single-blog-post.component.html',
  styleUrls: ['./single-blog-post.component.css']
})
export class SingleBlogPostComponent implements OnInit, OnDestroy {

  private subData: Subscription = new Subscription;

  blogId: any;
  blog !: any;

  constructor(private route: ActivatedRoute, private api: BlogService) { }

  ngOnInit(): void {
    console.warn("user id is: ", this.route.snapshot.paramMap.get('id'));
    this.blogId = this.route.snapshot.paramMap.get('id');
    this.getBlogById();

  }

  getBlogById() {
    this.api.getBlogById(this.blogId)
      .subscribe(res => {
        if (res.success) {
          console.log(res.data)
          this.blog = res.data;
        }

      }, (err) => {
        console.log(err)
      })
  }
  ngOnDestroy() {
    if (this.subData) {
      this.subData.unsubscribe();
    }
  }

}
