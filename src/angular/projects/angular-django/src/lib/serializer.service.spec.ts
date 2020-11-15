import { TestBed, inject } from '@angular/core/testing';

import { SerializerService } from './serializer.service';

describe('SerializerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SerializerService]
    });
  });

  it('should be created', inject([SerializerService], (service: SerializerService) => {
    expect(service).toBeTruthy();
  }));
});
