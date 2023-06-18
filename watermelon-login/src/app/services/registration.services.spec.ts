import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { RegistrationService } from './registration.services';

describe('RegistrationService', () => {
  let registrationService: RegistrationService;
  let httpMock: HttpTestingController;
  let httpClientSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegistrationService]
    });

    registrationService = TestBed.inject(RegistrationService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClientSpy = { post: jest.fn() }
  });

  it('should send a registerUser request', () => {
    const formData = {};
    const response = { registration_token: 'registration_token' };
    registrationService.registerUser(formData).subscribe((result) => {
      expect(result).toBe(true);
    });

    const req = httpMock.expectOne(request => request.url.endsWith('/registration'));
    expect(req.request.method).toBe('POST');
    req.flush(response);

    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(response))
  });

  it('should send a validateRegistration request', () => {
    const registrationToken = 'registration_token';
    const response = { access_token: 'access_token', legacy_token: 'legacy_token', refresh_token: 'refresh_token' };
    registrationService.validateRegistration(registrationToken).subscribe((result) => {
      expect(result).toBe(response.access_token);
    });

    const req = httpMock.expectOne(request => request.url.endsWith('/registration/validate'));
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ registration_token: registrationToken });
    req.flush(response);

    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(response));
  });

    it('should send a login request', () => {
      const requestBody = { user_name: 'user_name', password: 'password' };
      const response = { access_token: 'access_token', refresh_token: 'refresh_token' };
      registrationService.login('user_name', 'password').subscribe((result) => {
        expect(result).toBe(response.access_token);
      });

      const req = httpMock.expectOne(request => request.url.endsWith('/users/login'));
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(requestBody);
      req.flush(response);

      jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(response));
    });

  it('should send an additionalRegistration request', () => {
    const formData = {};
    registrationService.additionalRegistration(formData, 'access_token');

    const req = httpMock.expectOne(request => request.url.endsWith('/additional-registration'));
    expect(req.request.method).toBe('POST');
    req.flush({});

    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of({}))
  });
});
