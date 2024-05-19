import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly baseUrl = 'http://localhost:3000/comments';
  private readonly httpClient = inject(HttpClient);

  getAllComments() {
    return this.httpClient.get<Comment[]>(this.baseUrl);
  }

  getCommentsList(filter: string) {
    return this.httpClient.get<Comment[]>(`${this.baseUrl}?q=${filter}`);
  }

  getCommentsByPostId(postId: string) {
    return this.httpClient.get<Comment[]>(`${this.baseUrl}?postId=${postId}`);
  }

  getComment(id: string) {
    return this.httpClient.get<Comment>(`${this.baseUrl}/${id}`);
  }

  deleteComment(id: string) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
