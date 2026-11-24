import '@testing-library/jest-dom/vitest';
import { beforeEach, vi } from 'vitest';

//Mocks por defecto a nivel de ventana para evitar caídas en jsdom
if (typeof window !== 'undefined') {
  window.alert = vi.fn();
  window.confirm = vi.fn(() => true);
}

//Limpieza de storages y restauración de simulaciones antes de cada prueba
beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  vi.restoreAllMocks();
  window.alert = vi.fn();
  window.confirm = vi.fn(() => true);
});
