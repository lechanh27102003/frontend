import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../service/blog.service'; 
import { Blog } from '../../../models/blog';// Adjust the path as necessary


@Component({
  selector: 'app-tin-tuc',
  templateUrl: './tin-tuc.component.html',
  styleUrls: ['./tin-tuc.component.css']
})
export class TinTucComponent implements OnInit {
  blogs: Blog[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.loadBlogs();
    
  }
  

  loadBlogs() {
    this.blogService.getBlogs().subscribe(
      (data) => {
        this.blogs = data;
      },
      (error) => {
        console.error('Error fetching blogs', error);
      }
    );
  }
}
