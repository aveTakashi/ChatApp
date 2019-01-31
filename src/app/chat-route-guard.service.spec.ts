import { TestBed } from '@angular/core/testing';

import { ChatRouteGuardService } from './chat-route-guard.service';

describe('ChatRouteGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatRouteGuardService = TestBed.get(ChatRouteGuardService);
    expect(service).toBeTruthy();
  });
});
