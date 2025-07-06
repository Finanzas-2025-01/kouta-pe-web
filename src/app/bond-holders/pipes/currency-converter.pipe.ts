import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConverter',
  standalone: true
})
export class CurrencyConverterPipe implements PipeTransform {
  transform(value: number | undefined, currency: string, rates: { [key: string]: number }): number {
    if (value === undefined || !currency || !rates) {
      return 0;
    }
    const rate = rates[currency] || 1;
    return value * rate;
  }
}
