import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageModule } from './pages/login/login.module';

const routes: Routes = [
  {path: '', loadChildren: './pages/login/login.module#LoginPageModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes), LoginPageModule],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
