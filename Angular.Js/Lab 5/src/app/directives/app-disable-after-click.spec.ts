import { AppDisableAfterClick } from './app-disable-after-click';

describe('AppDisableAfterClick', () => {
  it('should create an instance', () => {
    const mockElementRef = { nativeElement: document.createElement('button') } as any;
    const directive = new AppDisableAfterClick(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
