import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    children: [],
    component: IndexComponent
  },
  
  {
    path: 'about',
    children: [],
    component: AboutComponent
  },

  {
    path: 'inventory',
    component: InventoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
