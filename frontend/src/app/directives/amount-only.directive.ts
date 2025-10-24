import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAmountOnly]',
  standalone: true,
})
export class AmountOnlyDirective {
  @HostListener('input', ['$event'])
  onInput(e: any) {
    const el = e.target as HTMLInputElement;
    // Keep only digits and a single dot
    const cleaned = el.value.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    el.value =
      parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : cleaned;
  }
}
