import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
})
export class DiscountPipe implements PipeTransform {
  transform(value: number, discount: number = 10): string {
    const discountedValue = value - (value * discount) / 100;
    return discountedValue.toFixed(2);
  }
}
