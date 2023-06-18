import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/*
 * Services based on watermelon platform registration.
 */
@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private baseUrl = 'https://api2-stage.watermelon.co/iam/v1';

  constructor(
    private http: HttpClient
  ) {}

  /*
   * Api for /registration.
   *
   * @param formData - The required form data in order to be passed on the request body.
   */
  registerUser(formData: any): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200/'
      })
    };

    return new Observable<boolean>((observer) => {
      this.http.post<any>(`${this.baseUrl}/registration`, formData, httpOptions).subscribe(
        (response: any) => {
          const registrationToken = response.registration_token;
          this.validateRegistration(registrationToken).subscribe((accessToken: string) => {
            if (accessToken) {
              observer.next(true);
              observer.complete();
            } else {
              console.error('No access token at registration!');
              observer.next(false);
              observer.complete();
            }
          });
        },
        (error: any) => {
          console.error(error);
          observer.next(false);
          observer.complete();
        }
      );
    });
  }

  /*
   * Api for /validate.
   *
   * @param registrationToken - The registration token in order to be passed on the request body.
   */
 validateRegistration(registrationToken: string): Observable<string> {
   const requestBody = {
     registration_token: registrationToken
   };

   return new Observable<string>((observer) => {
     this.http.post<any>(`${this.baseUrl}/registration/validate`, requestBody).subscribe(
       (response: any) => {
         const accessToken = response.access_token;
         const legacyToken = response.legacy_token;
         const refreshToken = response.refresh_token;

         console.log(legacyToken);
         console.log(refreshToken);

         if (accessToken) {
           observer.next(accessToken);
           observer.complete();
         } else {
           observer.next('');
           observer.complete();
         }
       },
       (error: any) => {
         console.error(error);
         observer.next('');
         observer.complete();
       }
     );
   });
 }

  /*
   * Api for /login.
   *
   * @param username - The username of the user who trying to login.
   * @param password - The password of the user who trying to login.
   */
  login(username: string, password: string): Observable<string> {
    const requestBody = {
      user_name: username,
      password: password
    };

    return new Observable<string>((observer) => {
      this.http.post<any>(`${this.baseUrl}/users/login`, requestBody).subscribe(
        (response: any) => {
          const accessToken = response.access_token;
          const refreshToken = response.refresh_token;

          if (accessToken) {
            observer.next(accessToken);
            observer.complete();
          } else {
            observer.next('');
            console.error('No accessToken at login!');
            observer.complete();
          }
        },
        (error: any) => {
          console.error(error);
          observer.next('');
          observer.complete();
        }
      );
    });
  }

  /*
   * Api for /additional-registration.
   *
   * @param formData - The required form data in order to be passed on the request body.
   */
  additionalRegistration(formData: any, accessToken: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      })
     };
    this.http.post<any>(`${this.baseUrl}/additional-registration`, formData, httpOptions).subscribe(
      (response: any) => {
        // Handle success response
        console.log(response);
      },
      (error: any) => {
        // Handle error response
        console.error(error);
      }
    );
  }
}
