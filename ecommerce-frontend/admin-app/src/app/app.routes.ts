import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { EditComponent } from './pages/auth/edit/edit.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StockComponent } from './pages/stock/stock.component';
import { TotalRevenueComponent } from './pages/reports/total-revenue/total-revenue.component';
import { ComparisonMonthComponent } from './pages/reports/comparison-month/comparison-month.component';
import { BestSellersComponent } from './pages/reports/best-sellers/best-sellers.component';
import { WorstSellersComponent } from './pages/reports/worst-sellers/worst-sellers.component';

export const routes: Routes = [
    {path: 'products', component: HomeComponent},
    {path: 'insert', component: RegisterComponent},
    {path: 'edit/:id', component: EditComponent},
    {path: 'orders', component: OrdersComponent},
    {path: '', component: DashboardComponent},
    {path: 'stock', component: StockComponent},
    {path: 'total-revenue', component: TotalRevenueComponent},
    {path: 'comparison-month', component: ComparisonMonthComponent},
    {path: 'best-sellers', component: BestSellersComponent},
    {path: 'worst-sellers', component: WorstSellersComponent}
];
