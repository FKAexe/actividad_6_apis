import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserResponse, IUser } from '../interfaces/iuser.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://peticiones.online/api/users';
  httpClient = inject(HttpClient);

  getUsers(page: number):Promise<IUserResponse> {
    const url = `${this.baseUrl}?page=${page}&per_page=8`;
    return lastValueFrom(this.httpClient.get<IUserResponse>(url));
  }
  getById(id:number):Promise<IUser>{
    const url = `${this.baseUrl}/${id}`;
    return lastValueFrom(this.httpClient.get<IUser>(url));
  }
}
