import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ShopComponent } from './pages/shop/shop.component';
import { AccountComponent } from './pages/user-area/account/account.component';
import { CartComponent } from './pages/user-area/cart/cart.component';
import { ProductComponent } from './pages/product-area/product/product.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'shop', component: ShopComponent},
    {path: 'account', component: AccountComponent},
    {path: 'cart', component: CartComponent},
    {path: 'produto/:id', component: ProductComponent}
];
