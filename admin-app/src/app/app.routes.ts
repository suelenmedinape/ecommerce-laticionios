import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { EditComponent } from './pages/auth/edit/edit.component';
import { OrdersComponent } from './pages/orders/orders.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'insert', component: RegisterComponent},
    {path: 'edit/:id', component: EditComponent},
    {path: 'orders', component: OrdersComponent},
];
