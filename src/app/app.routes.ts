import { Routes } from '@angular/router';
import {MainComponent} from './public/pages/main/main.component';
import {SignInComponent} from './iam/pages/sign-in/sign-in.component';
import {SignUpComponent} from './iam/pages/sign-up/sign-up.component';
import {authGuard} from './iam/services/auth-guard';
import {IssuersBonds} from './public/pages/issuers-bonds/issuers-bonds';
import {Bonds} from './bond-holders/pages/bonds/bonds';
import {BondCashflowComponent} from './bond-holders/pages/bond-cashflow/bond-cashflow.component';
import { CreateBondComponent } from './issuer/pages/create-bond/create-bond.component';
import { EditBondComponent } from './issuer/pages/edit-bond/edit-bond.component';
import {IssuedBondsComponent} from './issuer/pages/issued-bonds/issued-bonds.component';
import {
  FinancialInstrumentsComponent
} from './bond-holders/pages/financial-instruments/financial-instruments.component';
import {HiredBonds} from './bond-holders/pages/hired-bonds/hired-bonds';


export const routes: Routes = [
  {path: '' , component: MainComponent, canActivate:[authGuard]},
  {path: 'sign-in',component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'issuers/my-bonds', component:IssuedBondsComponent},
  {path: 'bonds', component:Bonds},
  {path: 'bonds/:id/cashflow' , component: BondCashflowComponent },
  {path: 'bonds/create', component: CreateBondComponent},
  {path: 'bonds/:id/edit', component: EditBondComponent},
  {path: 'bond-holders/bonds', component:FinancialInstrumentsComponent},
  {path: 'issuers/my-hired-bonds', component:HiredBonds},
];
