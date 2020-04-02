import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { UpdateHousingPage } from './update-housing.page';

describe('UpdateHousingPage', () => {
  let component: UpdateHousingPage;
  let fixture: ComponentFixture<UpdateHousingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateHousingPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateHousingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
