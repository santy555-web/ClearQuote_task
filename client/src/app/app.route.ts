import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: TodoComponent },
      { path: 'todo', component: TodoComponent },
      { path: 'todo-list', component: TodoListComponent }]
  },
  { path: '**', component: LoginComponent },
];

