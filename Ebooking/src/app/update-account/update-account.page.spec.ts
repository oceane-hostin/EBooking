import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { UpdateAccountPage } from './update-account.page';

describe('UpdateAccountPage', () => {
  let component: UpdateAccountPage;
  let fixture: ComponentFixture<UpdateAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAccountPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
