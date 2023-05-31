import { ElementRef } from '@angular/core';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = new ElementRef(null);
    const directive = new HighlightDirective(elementRefMock);
    expect(directive).toBeTruthy();
  });
});
