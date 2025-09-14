import { Component, inject, Input } from '@angular/core';
import { FormComponent } from "../../shared/form/form.component";
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user-service';
import { NavComponent } from '../../shared/nav/nav.component';

@Component({
  selector: 'app-updateuser',
  imports: [FormComponent,NavComponent],
  templateUrl: './updateuser.component.html',
  styleUrl: './updateuser.component.css'
})
export class UpdateuserComponent {
  @Input() user! : IUser
  userService = inject(UserService);
}
