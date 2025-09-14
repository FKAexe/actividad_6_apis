import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user-service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  _id: string | null = null;
  user! : IUser 
  userService = inject(UserService);
  reactiveForm: FormGroup;
  activatedRoute = inject(ActivatedRoute);
  actualizando = false;

  constructor() {
    this.reactiveForm = new FormGroup({
      first_name: new FormControl(this.user?.first_name || '',[
        Validators.required,
        Validators.minLength(3),
      ]),
      last_name: new FormControl(this.user?.last_name || '',[
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(this.user?.email || '',[
        Validators.required,
        Validators.email,
      ]),
      image: new FormControl(this.user?.image || '',[
        Validators.required,
        Validators.minLength(3)]),
    
    },[]);
  }
  checkControl(controlName: string, errorName: string) : boolean | undefined {
    return this.reactiveForm.get(controlName)?.hasError(errorName)&& this.reactiveForm.get(controlName)?.touched;
    
  }
  async cargarDatos(){
    const formValue = this.reactiveForm.value;
    console.log(formValue);
    if (this.user){
      await this.userService.updateUser(this.user._id, formValue)
      Swal.fire('Usuario creado', 'El usuario ha sido actualizado satisfactoriamente.', 'success');
    } 
    else{
      await this.userService.newUser(formValue);
      Swal.fire('Usuario creado', 'El usuario ha sido creado satisfactoriamente.', 'success');
    }
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      this._id = params['_id'] || null;
      this.actualizando = !!this._id;
      if (this.actualizando) {
        const response = await this.userService.getById(this._id);
        if (response) {
          this.reactiveForm.patchValue(response);
        }
      }
    });
  }
}