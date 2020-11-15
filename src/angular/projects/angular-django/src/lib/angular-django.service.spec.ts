import { TestBed } from '@angular/core/testing';

import { AngularDjangoService } from './angular-django.service';

describe('AngularDjangoService', () => {
  let service: AngularDjangoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularDjangoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
