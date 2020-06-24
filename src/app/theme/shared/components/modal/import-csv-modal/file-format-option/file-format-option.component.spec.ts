import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileFormatOptionComponent } from './file-format-option.component';

describe('FileFormatOptionComponent', () => {
  let component: FileFormatOptionComponent;
  let fixture: ComponentFixture<FileFormatOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileFormatOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileFormatOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
