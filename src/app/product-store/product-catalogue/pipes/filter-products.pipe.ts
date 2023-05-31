import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';

@Pipe({
  name: 'filterProducts',
})
export class FilterProductsPipe implements PipeTransform {
  transform(
    products: Product[],
    categoryToken: string,
    searchKeyword: string,
  ): Product[] {
    console.log(categoryToken);
    console.log(searchKeyword);
    if ((!categoryToken && !searchKeyword) || categoryToken === 'all') {
      return products;
    }

    const filterProductsByCategory = products.filter((product) =>
      product.category.toLowerCase().includes(categoryToken.toLowerCase()),
    );

    if (searchKeyword) {
      return filterProductsByCategory.filter((product) =>
        product.title.toLowerCase().includes(searchKeyword.toLowerCase()),
      );
    }
    return filterProductsByCategory;
  }
}
