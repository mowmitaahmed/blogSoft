import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Blog } from 'src/interfaces/blog';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';


// http://localhost:3000/api/v1/blog/
const API_BLOG = environment.apiBaseUrl + '/api/v1/blog/'

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

    /**
   * BLOG
   */

     getAllBlogs() {
      return this.http.get<{success: boolean; data: Blog[]; count: number}>(API_BLOG + 'get-all-blogs')
    }

    postBlog( data: any ){
      return this.http.post<{success: boolean; data: Blog[]; count: number}>(API_BLOG + 'add-blog', data).pipe(map((res:any)=>{
        return res;
      }));
    }

    getBlogById(_id : number) {
      return this.http.get<{success: boolean; data: Blog[]; count: number}>(API_BLOG+'get-blog-by-blog-id/'+_id).pipe(map((res:any)=>{
        return res;
      }));
    }

    updateBlog(data: any){
      return this.http.put<{success: boolean; data: Blog[]; count: number}>(API_BLOG+'edit-blog-by-id/', data).pipe(map((res:any)=>{
        return res;
      }));
    }
  
    deleteBlog(id: number){
      return this.http.delete<{success: boolean; data: Blog[]; count: number}>(API_BLOG+'delete-blog-by-id/'+id).pipe(map((res:any)=>{
        return res;
      }));
    }

    
}
