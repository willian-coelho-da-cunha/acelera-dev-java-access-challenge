import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JulioCesarComponent } from './julio-cesar.component';

describe('JulioCesarComponent', () => {
  let component: JulioCesarComponent;
  let fixture: ComponentFixture<JulioCesarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JulioCesarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JulioCesarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
