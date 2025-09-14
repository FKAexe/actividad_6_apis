import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user-service';
import { RouterLink } from '@angular/router';
import { NavComponent } from "../../shared/nav/nav.component";
import Swal from 'sweetalert2';

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
   async borrarUser(_id: string) {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el usuario permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });
  
    if (result.isConfirmed) {
      try {
        await this.userService.deleteUser(_id);
        Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
        // Optionally refresh list or navigate
      } catch (error) {
        Swal.fire('Error!', 'No se ha podido eliminar el usuario.', 'error');
      }
    }
  }
  }
