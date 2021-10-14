import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from 'src/app/services/blogs/blog.service';
import { Blog } from '../../../interfaces/blog';
import { Subscription } from 'rxjs';
import { BlogsModel } from '../../components/dashboard/blog-dashboard.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  blogsModelObj : BlogsModel = new BlogsModel(); 
  blogDatas !: any;
  private subData ?: Subscription;

  blogs: Blog[] = [];
  totalBlog = 0;

  constructor(
    private blogService: BlogService, private api: BlogService
  ) { }

  ngOnInit(): void {
    console.log('NG ON INIT');
    this.getAllBlogs();
  }
    // () => {}
  /**
   * HTTP REQ HANDLE
   */

  getAllBlogs() {
    this.subData = this.blogService.getAllBlogs()
      .subscribe(res => {
          if (res.success) {
            this.blogs = res.data;
            this.totalBlog = res.count;
          }
          console.log(this.blogs)
        },
        (err) => {
          console.log(err)
        })
  }

  ngOnDestroy(): void {
    if (this.subData) {
      this.subData.unsubscribe();
    }
  }

}
