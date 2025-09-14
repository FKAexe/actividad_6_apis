import { Component } from '@angular/core';
import { FormComponent } from "../../shared/form/form.component";
import { NavComponent } from "../../shared/nav/nav.component";

@Component({
  selector: 'app-newuser',
  imports: [FormComponent, NavComponent],
  templateUrl: './newuser.component.html',
  styleUrl: './newuser.component.css'
})
export class NewuserComponent {

}
