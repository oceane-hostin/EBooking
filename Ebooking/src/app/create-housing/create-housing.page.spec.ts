import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CreateHousingPage } from './create-housing.page';

describe('CreateHousingPage', () => {
  let component: CreateHousingPage;
  let fixture: ComponentFixture<CreateHousingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateHousingPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateHousingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
