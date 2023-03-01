import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSoundFormComponent } from './new-sound-form.component';

describe('NewSoundFormComponent', () => {
  let component: NewSoundFormComponent;
  let fixture: ComponentFixture<NewSoundFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSoundFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSoundFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
