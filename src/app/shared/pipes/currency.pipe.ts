import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
})
export class CurrencyPipe implements PipeTransform {
  currencyNameMapper: { [key: string]: string } = {
    euro: '€',
    baht: '฿',
  };

  transform(currencyName: string, currencyAmount: string | number): string {
    const symbol = this.currencyNameMapper[currencyName.toLowerCase()];
    if (symbol) {
      return `${symbol} ${currencyAmount}`;
    } else {
      return `${currencyName} ${currencyAmount}`;
    }
  }
}
