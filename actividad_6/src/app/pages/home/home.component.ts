import { Component, inject } from '@angular/core';
import { UserCard } from '../../components/user-card/user-card';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user-service';
import { NavComponent } from '../../shared/nav/nav.component';

@Component({
  selector: 'app-home',
  imports: [UserCard, NavComponent],
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
    this.myUsers = resp.results.slice(0, 8);
    this.currentPage = resp.page;
  }
  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.loadUsers(this.currentPage - 1)
      console.log(this.currentPage);
    }
  }
  goToNextPage() {
    if (this.currentPage < 2) {
      this.loadUsers(this.currentPage + 1);
    }
  }
}

