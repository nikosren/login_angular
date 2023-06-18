import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegistrationService } from '../services/registration.services';
import { RegistrationFormComponent } from './registration-form.component';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [RegistrationFormComponent],
      providers: [FormBuilder, RegistrationService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the registration form', () => {
    expect(component.registrationForm).toBeDefined();
    expect(component.registrationForm.get('firstName')).toBeDefined();
    expect(component.registrationForm.get('lastName')).toBeDefined();
    expect(component.registrationForm.get('email')).toBeDefined();
    expect(component.registrationForm.get('password')).toBeDefined();
  });

  it('should mark fields as invalid when touched and empty', () => {
    const firstNameField = component.registrationForm.controls['firstName'];
    firstNameField.markAsTouched();
    expect(component.isFieldInvalid('firstName')).toBe(true);
  });

  it('should mark fields as valid when filled', () => {
    const firstNameField = component.registrationForm.controls['firstName'];
    firstNameField.setValue('Nikos');
    expect(component.isFieldInvalid('firstName')).toBe(false);
  });
});
