import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { pesquisaGuard } from './pesquisa.guard';

describe('pesquisaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => pesquisaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
