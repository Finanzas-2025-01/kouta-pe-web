import { Routes } from '@angular/router';
import {LogInComponent} from './iam/pages/log-in/log-in.component';


export const routes: Routes = [
  {path: 'log-in', component: LogInComponent},
  {path : '', redirectTo: '/log-in', pathMatch: 'full'},
];
