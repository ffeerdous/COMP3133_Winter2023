import { TestBed } from '@angular/core/testing';

import { SpacexapiServiceService } from './spacexapi-service.service';

describe('SpacexapiServiceService', () => {
  let service: SpacexapiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpacexapiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
