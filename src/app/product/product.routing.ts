import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductCatalogueComponent } from './product-store/product-catalogue/product-catalogue.component';
import { ProductCheckoutComponent } from './product-store/product-checkout/product-checkout.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: 'checkout',
        component: ProductCheckoutComponent,
      },
      {
        path: ':category',
        component: ProductCatalogueComponent,
      },
      {
        path: '',
        component: ProductCatalogueComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
