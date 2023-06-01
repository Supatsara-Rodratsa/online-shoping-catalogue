import { Pipe, PipeTransform } from '@angular/core';
import {
  FilterProduct,
  Pagination,
  Product,
} from 'src/app/interfaces/product.interface';

@Pipe({
  name: 'filterProducts',
})
export class FilterProductsPipe implements PipeTransform {
  transform(
    products: Product[],
    categoryToken: string,
    searchKeyword?: string,
    paginationSetting?: Pagination,
  ): FilterProduct {
    // Return all products
    if (categoryToken === 'all' && !searchKeyword) {
      return {
        filterItems: this.handlePagination(products, paginationSetting),
        totalItems: products.length,
      };
    }

    // Filter Product by categories
    const filterProductsByCategory = this.filterProductByCategory(
      products,
      categoryToken,
    );

    // Handle Search Item
    if (searchKeyword) {
      const filterItems = this.filterProductBySearchKeyword(
        categoryToken === 'all' ? products : filterProductsByCategory,
        searchKeyword,
      );

      return {
        filterItems: this.handlePagination(filterItems, paginationSetting),
        totalItems: filterItems.length,
      };
    }

    return {
      filterItems: this.handlePagination(
        filterProductsByCategory,
        paginationSetting,
      ),
      totalItems: filterProductsByCategory.length,
    };
  }

  private filterProductByCategory(products: Product[], category: string) {
    return products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase(),
    );
  }

  private filterProductBySearchKeyword(products: Product[], keyword: string) {
    return products.filter((product) => {
      return product.title.toLowerCase().includes(keyword.toLowerCase());
    });
  }

  private handlePagination(
    products: Product[],
    paginationSetting?: Pagination,
  ) {
    if (paginationSetting) {
      const { pageSize, currentPage } = paginationSetting;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      return products.slice(startIndex, endIndex);
    }
    return products;
  }
}
