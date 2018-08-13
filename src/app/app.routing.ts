import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { LoginGuard } from './guards/auth.guard';


const APP_ROUTES: Routes = [
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'users' , component : UserComponent, canActivate: [LoginGuard] 
  },
  { path: '**', pathMatch: 'full', redirectTo: 'users' }
];



export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);