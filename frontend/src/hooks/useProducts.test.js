import { renderHook, waitFor } from '@testing-library/react';
import useProducts from './useProducts';
import getProducts from '../services/product.service';

jest.mock('../services/product.service');

describe('useProducts Hook', () => {
  const mockData = [
    {
      id: 1,
      name: 'P1',
      preferences: ['Pref A', 'Pref B', 'Pref C'],
      features: ['Feat A', 'Feat B', 'Feat C'],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve buscar produtos e processar preferências e funcionalidades', async () => {
    getProducts.mockResolvedValue(mockData);

    const { result } = renderHook(() => useProducts());

    expect(result.current.products).toEqual([]);
    expect(result.current.preferences).toEqual([]);
    expect(result.current.features).toEqual([]);

    await waitFor(() => {
      expect(result.current.products).toEqual(mockData);
    });

    expect(result.current.preferences.length).toBeLessThanOrEqual(2);
    expect(result.current.features.length).toBeLessThanOrEqual(2);
  });

  test('deve lidar com erro ao buscar produtos', async () => {
    const error = new Error('Erro API');
    getProducts.mockRejectedValue(error);
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => { });

    renderHook(() => useProducts());

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Erro ao obter os produtos:',
        error
      );
    });

    consoleSpy.mockRestore();
  });
});
