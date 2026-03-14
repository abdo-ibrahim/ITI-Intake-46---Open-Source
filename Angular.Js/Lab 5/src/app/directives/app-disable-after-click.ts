import { Directive, ElementRef, Host, HostListener } from '@angular/core';

@Directive({
  selector: '[appAppDisableAfterClick]',
})
export class AppDisableAfterClick {
  constructor(private el: ElementRef) {}

  @HostListener('click')
  onClick() {
    const button = this.el.nativeElement as HTMLButtonElement;
    button.disabled = true;
    const originalText = button.innerText;
    button.innerText = 'Processing…';

    setTimeout(() => {
      button.disabled = false;
      button.innerText = originalText;
    }, 3000);
  }
}
