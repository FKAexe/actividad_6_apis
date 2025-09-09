import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserResponse } from '../interfaces/iuser.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://peticiones.online/api/users';
  httpClient = inject(HttpClient);

  getUsers(page: number):Promise<IUserResponse> {
    const url = `${this.baseUrl}?page=${page}`;
    return lastValueFrom(this.httpClient.get<IUserResponse>(url));
  }
}
