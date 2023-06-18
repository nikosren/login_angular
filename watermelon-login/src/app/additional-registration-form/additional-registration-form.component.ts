import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from '../services/registration.services';

/*
 * Component for watermelon platform additional registration.
 */
@Component({
  selector: 'app-additional-registration-form',
  templateUrl: './additional-registration-form.component.html',
  styleUrls: ['./additional-registration-form.component.css']
})
export class AdditionalRegistrationFormComponent implements OnInit {
  additionalRegistrationForm!: FormGroup;
  accessToken!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private registrationService: RegistrationService
  ) {}

  ngOnInit(): void {
    this.additionalRegistrationForm = this.fb.group({
      companyName: ['', Validators.required],
      industry: ['Overheid'],
      mainGoal: ['Increase customer satisfaction'],
      useCase: ['Marketing & lead generatie', Validators.required]
    });
    this.accessToken = this.route.snapshot?.data?.['accessToken'];
  }

  submitAdditionalRegistrationForm(): void {
    if (this.additionalRegistrationForm.invalid) {
      return;
    }

    const requestBody = {
      company_name: this.additionalRegistrationForm.value.companyName,
      industry: this.additionalRegistrationForm.value.industry,
      main_goal: this.additionalRegistrationForm.value.mainGoal,
      use_case: this.additionalRegistrationForm.value.useCase
    };
    this.registrationService.additionalRegistration(requestBody, this.accessToken);
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.additionalRegistrationForm.get(field);
    return Boolean(formControl?.invalid && formControl?.touched);
  }
}
