import { Routes } from '@angular/router';
import {MainComponent} from './public/pages/main/main.component';
import {SignInComponent} from './iam/pages/sign-in/sign-in.component';
import {SignUpComponent} from './iam/pages/sign-up/sign-up.component';
import {authGuard} from './iam/services/auth-guard';
import {IssuersBonds} from './public/pages/issuers-bonds/issuers-bonds';
import {Bonds} from './bond-holders/pages/bonds/bonds';


export const routes: Routes = [
  {path: '' , component: MainComponent, canActivate:[authGuard]},
  {path: 'sign-in',component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'issuers/my-bonds', component:IssuersBonds},
  {path: 'bonds', component:Bonds}
];
