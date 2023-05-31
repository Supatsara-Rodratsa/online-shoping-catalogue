import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnChanges {
  @Input('appHighlight')
  searchKeyword = '';

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('searchKeyword' in changes) {
      const innerHTML = (this.el.nativeElement as HTMLElement).textContent;
      if (innerHTML) {
        if (this.searchKeyword === '') {
          this.el.nativeElement.innerHTML = innerHTML;
        } else {
          const regex = new RegExp(this.searchKeyword, 'gi');
          const newText = innerHTML?.replace(regex, (match: string) => {
            return `<mark class="highlighted">${match}</mark>`;
          });
          this.el.nativeElement.innerHTML = newText;
        }
      }
    }
  }
}
