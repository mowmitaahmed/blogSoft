import { Component, OnInit, OnDestroy} from '@angular/core';
import { BlogService } from 'src/app/services/blogs/blog.service';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Blog } from '../../../interfaces/blog';
import { Subscription } from 'rxjs';
import { BlogsModel } from './blog-dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy  {

  blogsModelObj: BlogsModel = new BlogsModel();
  formValue !: FormGroup;
  showAdd !: boolean;
  showUpdate !: boolean;
  blogData !: any;


  displayedColumns: string[] = ['_id', 'Author', 'Title', 'Short Description','CreatedAt','UpdatedAt', 'Actions'];

  private subData: Subscription = new Subscription;

  blogs: Blog[] = [];
  totalBlog = 0;

  constructor( private formBuilder: FormBuilder, private api: BlogService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      title: [''],
      slug: [''],
      author: [''],
      shortDescription: [''],
      createdAt: new Date(),
      updatedAt: new Date()
    });
    this.getAllBlogs();
  }

  getTitle(){
    return this.formValue.get('title');
  }
  // () => {}
/**
 * HTTP REQ HANDLE
 */

getAllBlogs() {
  this.subData = this.api.getAllBlogs()
    .subscribe(res => {
        if (res.success) {
          this.blogs = res.data;
          this.totalBlog = res.count;
        }
        console.log(this.blogs);
      },
      (err) => {
        console.log(err)
      })
}

postBlogDetails() {

      this.blogsModelObj.title = this.formValue.value.title;
      this.blogsModelObj.author = this.formValue.value.author;
      this.blogsModelObj.slug = this.formValue.value.slug;
      this.blogsModelObj.shortDescription = this.formValue.value.shortDescription;

      console.log('blogsModelObj: ', this.blogsModelObj);
  
      this.api.postBlog(this.blogsModelObj).subscribe(res => {
        console.log("Hello");
          if (res.success) {
            console.log(res);
            alert("Post Added Successfully");
            this.formValue.reset();
          }
          this.getAllBlogs();
        },
          err => {
            alert(err)
          })
}



deletePost(row: any) {
  this.api.deleteBlog(row._id)
    .subscribe(res => {
      if (res.success) {
        console.log("Delete row", row);
      }
      this.getAllBlogs();
    }, (err) => {
      console.log(err)
    })
}



onEdit(row: any){
  this.showAdd = false;
  this.showUpdate = true;

  this.blogsModelObj._id = row._id;
  // console.log('ID: ', this.blogsModelObj.id);
  this.formValue.controls['author'].setValue(row.author); 
  this.formValue.controls['slug'].setValue(row.slug); 
  this.formValue.controls['title'].setValue(row.title); 
  this.formValue.controls['shortDescription'].setValue(row.shortDescription);
}

updateBlogDetails() {

  this.blogsModelObj.title = this.formValue.value.title;
  this.blogsModelObj.author = this.formValue.value.author;
  this.blogsModelObj.slug = this.formValue.value.slug;
  this.blogsModelObj.shortDescription = this.formValue.value.shortDescription;

  this.api.updateBlog(this.blogsModelObj).subscribe(res => {
      if (res.success) {
        console.log(res)
        this.formValue.reset();
      }
      this.getAllBlogs();
    }, (err) => {
      console.log(err)
    })
}

ngOnDestroy(): void {
  if (this.subData) {
    this.subData.unsubscribe();
  }
}

}
