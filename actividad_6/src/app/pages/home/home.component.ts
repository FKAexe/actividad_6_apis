import { Component, inject } from '@angular/core';
import { UserCard } from '../../components/user-card/user-card';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-home',
  imports: [UserCard],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  myUsers : IUser[] = []
  userService = inject(UserService);
  currentPage :number = 1;

  async ngOnInit(){
    await this.loadUsers(this.currentPage);
}
  async loadUsers(page: number){
    const resp = await this.userService.getUsers(page)
    this.myUsers = resp.results;
    console.log('API response:', resp);
    console.log('Users:', this.myUsers); 
  }
}
