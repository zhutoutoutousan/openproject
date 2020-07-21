import { TestBed } from '@angular/core/testing';

import { SubtaskActionService } from './subtask-action.service';

describe('SubtaskActionService', () => {
  let service: SubtaskActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubtaskActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
