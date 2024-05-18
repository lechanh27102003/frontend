export interface Blog {
    _id?: string;  // Optional since it's typically assigned by MongoDB
    title: string;
    image: string;  // This will contain a base64 encoded string of the image
    link?: string;  // Optional link for more details or external source
    createDate: Date;  // Date the blog was published, formatted as a string
    content?: string; 
    author: string; // Optional full content of the blog
  }