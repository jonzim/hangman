import { TestBed } from '@angular/core/testing';

import { GuessLetterService } from './guess-letter.service';

describe('GuessLetterService', () => {
  let service: GuessLetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuessLetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
