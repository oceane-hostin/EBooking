import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CreateBookingPage } from './create-booking.page';

describe('CreateBookingPage', () => {
  let component: CreateBookingPage;
  let fixture: ComponentFixture<CreateBookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBookingPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
