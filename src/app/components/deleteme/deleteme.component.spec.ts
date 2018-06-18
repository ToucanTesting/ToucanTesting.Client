import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletemeComponent } from './deleteme.component';

describe('DeletemeComponent', () => {
  let component: DeletemeComponent;
  let fixture: ComponentFixture<DeletemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
