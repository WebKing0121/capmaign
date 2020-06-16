import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleScopeListComponent } from './rule-scope-list.component';

describe('RuleScopeListComponent', () => {
  let component: RuleScopeListComponent;
  let fixture: ComponentFixture<RuleScopeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleScopeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleScopeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
