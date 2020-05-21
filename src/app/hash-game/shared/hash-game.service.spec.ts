import { TestBed, inject } from '@angular/core/testing';

import { HashGameService } from './hash-game.service';

describe('HashGameService', () => {
  let service: HashGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HashGameService);
  });

});
