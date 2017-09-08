import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientNewComponent } from './new.component';

describe('NewComponent', () => {
  let component: ClientNewComponent;
  let fixture: ComponentFixture<ClientNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
