import { Routes } from '@angular/router';
import {MainComponent} from './public/pages/main/main.component';
import {SignInComponent} from './iam/pages/sign-in/sign-in.component';
import {SignUpComponent} from './iam/pages/sign-up/sign-up.component';


export const routes: Routes = [
  {path: '/' , component: MainComponent},
  {path: 'sign-in',component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path : '', redirectTo: '/', pathMatch: 'full'},
];
