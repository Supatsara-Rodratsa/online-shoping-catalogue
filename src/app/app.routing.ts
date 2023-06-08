import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./product/product.routing').then((m) => m.ProductRoutingModule),
    title: 'Product Catalogue',
    pathMatch: 'prefix',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Page Not Found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
