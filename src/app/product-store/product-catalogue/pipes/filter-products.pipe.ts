import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';

@Pipe({
  name: 'filterProducts',
})
export class FilterProductsPipe implements PipeTransform {
  transform(products: Product[], filterToken: string): Product[] {
    if (filterToken === '' || filterToken === 'all') {
      return products;
    }
    return products.filter((product) =>
      product.category.toLowerCase().includes(filterToken.toLowerCase()),
    );
  }
}
