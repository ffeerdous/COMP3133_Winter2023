import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/app-login', pathMatch: 'full' },
  { path: 'app-login', component: UserLoginComponent},
  { path: 'app-user-signup', component: UserSignupComponent},
  { path: 'app-employee-list', component: EmployeeListComponent },
  { path: 'app-add-employee', component: AddEmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
