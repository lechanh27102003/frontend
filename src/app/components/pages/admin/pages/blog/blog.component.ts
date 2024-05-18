import { Component } from '@angular/core';
import { BlogService } from '../../../../../service/blog.service';  // Adjust the path as necessary

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  blogs: any[] = [];
  newBlog: any = {};
  editingBlog: any = null;
  showCreateForm: boolean = false;
  selectedImage: File | null = null;

  constructor(private blogService: BlogService) {
    this.loadBlogs();
  }

  startEditing(blog: any) {
    this.editingBlog = {...blog};
  }

  updateBlog() {
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        this.editingBlog.image = reader.result;
        this.submitUpdate();
      };
      reader.readAsDataURL(this.selectedImage);
    } else {
      this.submitUpdate();
    }
  }
  submitUpdate() {
    this.blogService.updateBlog(this.editingBlog._id, this.editingBlog).subscribe(
      response => {
        console.log('Blog updated successfully:', response);
        this.loadBlogs();
        this.cancelEditing();
      },
      error => {
        console.error('Failed to update blog:', error);
      }
    );
  }

  cancelEditing() {
    this.editingBlog = null;
  }

  loadBlogs() {
    this.blogService.getBlogs().subscribe(
      (response) => {
        this.blogs = response.map((blog: any) => ({
          ...blog,
          createDate: new Date(blog.createDate).toLocaleDateString(),
          selected: false
        }));
      },
      (error) => console.error('Failed to load blogs:', error)
    );
  }

  showCreateBlogForm() {
    this.showCreateForm = true;
  }

  hideCreateBlogForm() {
    this.showCreateForm = false;
  }

  addBlog() {
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newBlog.image = reader.result; // Sets image as base64 encoded string
        this.blogService.addBlog(this.newBlog).subscribe(
          (response) => {
            console.log('Blog added successfully:', response);
            this.hideCreateBlogForm();
            this.loadBlogs();
          },
          (error) => {
            console.error('Failed to add blog:', error);
          }
        );
      };
      reader.readAsDataURL(this.selectedImage);
    } else {
      console.error('No image selected!');
      // Optionally handle case where no image is selected but form submission is required
    }
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  selectAll(event: any) {
    const isChecked = event.target.checked;
    this.blogs.forEach(blog => blog.selected = isChecked);
  }

  deleteSelectedBlogs() {
    this.blogs.forEach(blog => {
      if (blog.selected) {
        this.blogService.deleteBlog(blog._id).subscribe(
          response => {
            console.log('Blog deleted successfully:', response);
            // Reload the blogs to reflect the deletion
            this.loadBlogs();
          },
          error => console.error('Failed to delete blog:', error)
        );
      }
    });
    // Optionally filter out deleted blogs from the local array immediately
    this.blogs = this.blogs.filter(blog => !blog.selected);
  }
}
