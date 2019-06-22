import { TestBed } from '@angular/core/testing';

import { CameraAssignmentService } from './camera-assignment.service';

describe('CameraAssignmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CameraAssignmentService = TestBed.get(CameraAssignmentService);
    expect(service).toBeTruthy();
  });
});
