import { TestBed, inject } from '@angular/core/testing';

import { ServiceProxyService } from './service-proxy.service';

describe('ServiceProxyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceProxyService]
    });
  });

  it('should be created', inject([ServiceProxyService], (service: ServiceProxyService) => {
    expect(service).toBeTruthy();
  }));
});
