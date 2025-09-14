import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user-service';
import { RouterLink } from '@angular/router';
import { NavComponent } from "../../shared/nav/nav.component";

@Component({
  selector: 'app-user',
  imports: [RouterLink, NavComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input() _id : string = "";
  user!: IUser
  userService = inject(UserService);

  async ngOnInit(){
    const _id: string = this._id;
    const response = await this.userService.getById(_id);
    if(!response){
      console.log('User not found');
    }
    this.user = response!
  }
}