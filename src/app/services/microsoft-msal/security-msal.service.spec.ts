import { TestBed } from '@angular/core/testing';
import { SecurityMsalService } from './security-msal.service';


describe('SecurityMsalService', () => {
  let service: SecurityMsalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityMsalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
