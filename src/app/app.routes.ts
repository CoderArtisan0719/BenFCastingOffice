import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmailComponent } from "./pages/email/email.component";

import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [authGuard] },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'email', component: EmailComponent, pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];
