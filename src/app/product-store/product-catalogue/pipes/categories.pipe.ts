import { Pipe, PipeTransform } from '@angular/core';
import { Tab, Product } from 'src/app/interfaces/product.interface';

@Pipe({
  name: 'categories',
})
export class CategoriesPipe implements PipeTransform {
  transform(
    products: Product[],
    token:
      | 'includeCountedItems'
      | 'excludeCountedItems' = 'excludeCountedItems',
  ): Tab[] {
    const categoryCountMap = new Map<string, number>();

    products.forEach((product) => {
      const category = categoryCountMap.get(product.category);
      if (category) {
        categoryCountMap.set(product.category, category + 1);
      } else {
        categoryCountMap.set(product.category, 1);
      }
    });

    const categoriesWithCount: Tab[] = [];
    for (const [name, quantity] of categoryCountMap.entries()) {
      categoriesWithCount.push(
        token === 'includeCountedItems' ? { name, quantity } : { name },
      );
    }

    return categoriesWithCount;
  }
}
