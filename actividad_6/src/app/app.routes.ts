import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { NewuserComponent } from './pages/newuser/newuser.component';
import { UpdateuserComponent } from './pages/updateuser/updateuser.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'user/:_id', component: UserComponent},
    {path: 'newuser', component: NewuserComponent},
    {path: 'updateuser/:_id',component: UpdateuserComponent},
    {path: '**', redirectTo: ''}
];
