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
      const defaultText = (this.el.nativeElement as HTMLElement).textContent;

      if (defaultText) {
        if (this.searchKeyword === '') {
          this.el.nativeElement.innerHTML = defaultText;
        } else {
          const regex = new RegExp(this.searchKeyword, 'gi');
          const highlightText = defaultText?.replace(regex, (match: string) => {
            return `<mark class="highlighted">${match}</mark>`;
          });
          this.el.nativeElement.innerHTML = highlightText;
          console.log(
            this.el.nativeElement.innerHTML,
            'this.el.nativeElement.innerHTML',
          );
        }
      }
    }
  }
}
