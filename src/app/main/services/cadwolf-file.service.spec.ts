import { TestBed } from '@angular/core/testing';

import { CadwolfFileService } from './cadwolf-file.service';

describe('CadwolfFileService', () => {
  let service: CadwolfFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadwolfFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
