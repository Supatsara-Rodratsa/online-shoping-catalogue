import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';

@Pipe({
  name: 'filterCategories',
})
export class FilterCategoriesPipe implements PipeTransform {
  transform(products: Product[]): string[] {
    return Array.from(new Set(products.map((product) => product.category)));
  }
}
