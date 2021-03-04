import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationlogsComponent } from './applicationlogs.component';

describe('ApplicationlogsComponent', () => {
  let component: ApplicationlogsComponent;
  let fixture: ComponentFixture<ApplicationlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationlogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
