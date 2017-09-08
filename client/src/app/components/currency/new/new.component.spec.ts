import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyNewComponent } from './new.component';

describe('NewComponent', () => {
  let component: CurrencyNewComponent;
  let fixture: ComponentFixture<CurrencyNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
