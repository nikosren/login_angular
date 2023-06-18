import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { AdditionalRegistrationFormComponent } from './additional-registration-form/additional-registration-form.component';

const routes: Routes = [
  { path: '', component: RegistrationFormComponent },
  { path: 'additional-registration-form', component: AdditionalRegistrationFormComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
