import '@testing-library/jest-dom/vitest';
import { beforeEach, vi } from 'vitest';

//Limpieza de storages y simulaciones antes de cada prueba
beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  vi.restoreAllMocks();
});