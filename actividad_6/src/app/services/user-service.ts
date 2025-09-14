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

  getUsers(page: number):Promise<IUserResponse>{
    const url = `${this.baseUrl}?page=${page}&per_page=8`;
    return lastValueFrom(this.httpClient.get<IUserResponse>(url));
  }
  getById(_id:string | null):Promise<IUser> | undefined{
    const url = `${this.baseUrl}/${_id}`;
    return lastValueFrom(this.httpClient.get<IUser>(url))

  }
  updateUser(_id:string, formValue:Partial<IUser> ):Promise<IUser | undefined>{
    const url = `${this.baseUrl}/${_id}`;
    const response = lastValueFrom(this.httpClient.put<IUser | undefined>(url, formValue))
    return response
  }
  newUser(user: Partial<IUser>):Promise<IUser | undefined>{
    const response = lastValueFrom(this.httpClient.post<IUser | undefined>(this.baseUrl, user))
    console.log(response)
    return response
    
  }
}
