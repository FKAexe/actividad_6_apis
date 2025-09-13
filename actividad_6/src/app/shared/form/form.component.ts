import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Input() user: IUser | null = null;
  userService = inject(UserService);
  reactiveForm: FormGroup;

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
        Validators.pattern(/^\w+\@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
      ]),
      image: new FormControl(this.user?.image || '',[Validators.required])
    
    },[]);
  }
  checkControl(controlName: string, errorName: string) : boolean | undefined {
    return this.reactiveForm.get(controlName)?.hasError(errorName)&& this.reactiveForm.get(controlName)?.touched;
    
  }
  async cargarDatos(){
    const formValue = this.reactiveForm.value;
    console.log(formValue);
    if (this.user){
      await this.userService.updateUser(this.user._id, formValue);
    } 
    else{
      await this.userService.newUser(formValue);
      console.log('error')
    }
  }
}