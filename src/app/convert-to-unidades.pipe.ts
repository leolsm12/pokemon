import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'convertToCentimeters' })
   
export class ConvertToCentimetersPipe implements PipeTransform {
  transform(value: number, ...args: any[]): any {
    if (value) {
      return value * 10;
    }
    return value;
  }
}

@Pipe({
    name: 'convertToKilograms'
  })
  export class ConvertToKilogramsPipe implements PipeTransform {
    transform(value: number): number {
      // converter de hectogramas para kg (1 hg = 0.1 kg)
      return value / 100;
    }
  }
@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}