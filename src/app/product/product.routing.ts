import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductCatalogueComponent } from './product-store/product-catalogue/product-catalogue.component';
import { ProductCheckoutComponent } from './product-store/product-checkout/product-checkout.component';
import { ProductSuccessComponent } from './product-store/product-success/product-success.component';

const routes: Routes = [
  {
    path: 'success',
    component: ProductSuccessComponent,
    title: 'Order successfully',
  },
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: 'checkout',
        component: ProductCheckoutComponent,
        title: 'Checkout',
      },
      {
        path: ':category',
        component: ProductCatalogueComponent,
        title: 'Categorized Product',
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
