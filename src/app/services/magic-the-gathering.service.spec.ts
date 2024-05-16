import { TestBed } from '@angular/core/testing';

import { MagicTheGatheringService } from './magic-the-gathering.service';

describe('MagicTheGatheringService', () => {
  let service: MagicTheGatheringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagicTheGatheringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
