import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly baseUrl = 'http://localhost:3000/posts';
  private readonly httpClient = inject(HttpClient);

  getAllPosts() {
    return this.httpClient.get<Post[]>(this.baseUrl);
  }

  getPostsList(filter: string) {
    return this.httpClient.get<Post[]>(`${this.baseUrl}?q=${filter}`);
  }

  getPost(id: string) {
    return this.httpClient.get<Post>(`${this.baseUrl}/${id}`);
  }
}
