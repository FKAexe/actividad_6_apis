import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css'
})
export class UserCard {
  @Input() user!: IUser;
  userService = inject(UserService);

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
