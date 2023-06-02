import { AfterViewChecked, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements AfterViewChecked {
  @Input('appHighlight')
  searchKeyword = '';

  constructor(private el: ElementRef) {}

  ngAfterViewChecked(): void {
    this.highlightText();
  }

  private highlightText() {
    const defaultText = (this.el.nativeElement as HTMLHeadingElement)
      ?.textContent;
    if (defaultText) {
      if (this.searchKeyword === '') {
        this.el.nativeElement.innerHTML = defaultText;
      } else {
        const regex = new RegExp(this.searchKeyword, 'gi');
        const highlightText = defaultText?.replace(regex, (match: string) => {
          return `<mark class="highlighted">${match}</mark>`;
        });
        this.el.nativeElement.innerHTML = highlightText;
      }
    }
  }
}
