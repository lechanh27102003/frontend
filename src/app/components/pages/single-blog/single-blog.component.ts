import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../service/blog.service';  // Adjust the path as necessary
import { Blog } from '../../../models/blog';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css']
})
export class SingleBlogComponent implements OnInit {
  blog: Blog | undefined;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.blogService.getBlogById(id).subscribe(blog => {
        this.blog = blog;
      });
    });
  }
  formatDateString(dateString?: Date): string {
    if (!dateString) {
      return '-';
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('vn-VN', { year: 'numeric', month: 'short', day: '2-digit' });
  }
}