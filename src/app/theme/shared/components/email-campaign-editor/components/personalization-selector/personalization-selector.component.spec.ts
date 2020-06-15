import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizationSelectorComponent } from './personalization-selector.component';

describe('PersonalizationSelectorComponent', () => {
  let component: PersonalizationSelectorComponent;
  let fixture: ComponentFixture<PersonalizationSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalizationSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalizationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
