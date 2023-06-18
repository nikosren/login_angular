import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { RegistrationService } from '../services/registration.services';
import { AdditionalRegistrationFormComponent } from './additional-registration-form.component';

describe('AdditionalRegistrationFormComponent', () => {
  let component: AdditionalRegistrationFormComponent;
  let fixture: ComponentFixture<AdditionalRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [AdditionalRegistrationFormComponent],
      providers: [
        FormBuilder,
        RegistrationService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                accessToken: 'mockAccessToken'
              },
              paramMap: convertToParamMap({})
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.additionalRegistrationForm.get('companyName')?.value).toEqual('');
    expect(component.additionalRegistrationForm.get('industry')?.value).toEqual('Overheid');
    expect(component.additionalRegistrationForm.get('mainGoal')?.value).toEqual('Increase customer satisfaction');
    expect(component.additionalRegistrationForm.get('useCase')?.value).toEqual('Marketing & lead generatie');
  });

  it('should mark the form as invalid when required fields are empty', () => {
    component.additionalRegistrationForm.get('companyName')?.setValue('');
    component.additionalRegistrationForm.get('useCase')?.setValue('');
    expect(component.additionalRegistrationForm.invalid).toBeTruthy();
  });

  it('should mark the form as valid when all required fields are filled', () => {
    component.additionalRegistrationForm.get('companyName')?.setValue('Example Company');
    component.additionalRegistrationForm.get('useCase')?.setValue('Marketing & lead generatie');
    expect(component.additionalRegistrationForm.valid).toBeTruthy();
  });
});
