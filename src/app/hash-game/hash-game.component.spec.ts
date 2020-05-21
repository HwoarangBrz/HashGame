import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HashGameComponent } from './hash-game.component';
import { HashGameService } from './shared';

describe('HashGameComponent', () => {
  let component: HashGameComponent;
  let fixture: ComponentFixture<HashGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        HashGameComponent 
      ],
      providers: [
        HashGameService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HashGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
