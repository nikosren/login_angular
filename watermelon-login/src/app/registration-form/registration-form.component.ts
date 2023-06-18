import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration.services';

/*
 * Component for watermelon platform registration.
 */
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registrationService: RegistrationService
  ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitRegistrationForm() {
    if (this.registrationForm.invalid) {
      return;
    }

    const requestBody = {
      Wwvd: false,
      company: '',
      country: 'Netherlands',
      email: this.registrationForm.value.email,
      firstname: this.registrationForm.value.firstName,
      language: '',
      lastname: this.registrationForm.value.lastName,
      password: this.registrationForm.value.password,
      phone: '5642582',
      plan_id: 5,
      referer: 'Nikos',
      skip_slack_notification: true
    };

    this.isSubmitting = true;

    this.registrationService.registerUser(requestBody).subscribe((success: boolean) => {
      if (success) {
        const username = this.registrationForm.value.email;
        const password = this.registrationForm.value.password;

        this.registrationService.login(username, password).subscribe((accessToken: string) => {
          if (accessToken) {
            this.isSubmitting = false;
            this.router.navigate(['/additional-registration-form'], { state: { accessToken } });
          } else {
            // Login failed.
            this.isSubmitting = false;
          }
        });
      } else {
        // Registration failed.
        this.isSubmitting = false;
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.registrationForm.get(field);
    return Boolean(formControl?.invalid && formControl?.touched);
  }
}
