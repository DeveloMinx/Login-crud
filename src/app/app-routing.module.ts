import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowComponent } from './components/show/show.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component'
import { DepComponent } from './components/dep/dep.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
  { path: 'verificar-correo', component: VerificarCorreoComponent },
  { path: 'recuperar-password', component: RecuperarPasswordComponent},
  { path: 'dashboard', component: DashboardComponent},
  {path:'Principal', component:ShowComponent},
  {path: 'depositar/:id', component:DepComponent},
  {path:'crear', component:CreateComponent},
  {path:'retirar/:id', component:EditComponent},

  { path: '**', redirectTo: 'login', pathMatch: 'full' },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
