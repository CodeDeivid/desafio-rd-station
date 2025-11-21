import { renderHook, act } from '@testing-library/react';
import useRecommendations from './useRecommendations';
import recommendationService from '../services/recommendation.service';

jest.mock('../services/recommendation.service');

describe('useRecommendations Hook', () => {
  const mockProducts = [{ id: 1, name: 'P1' }];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve inicializar com estado vazio', () => {
    const { result } = renderHook(() => useRecommendations(mockProducts));
    expect(result.current.recommendations).toEqual([]);
  });

  test('deve atualizar o estado de recomendações', () => {
    const { result } = renderHook(() => useRecommendations(mockProducts));

    act(() => {
      result.current.setRecommendations([{ id: 1, name: 'Teste' }]);
    });

    expect(result.current.recommendations).toEqual([{ id: 1, name: 'Teste' }]);
  });

  test('deve chamar o serviço de recomendação corretamente', () => {
    const mockResult = [{ id: 1, name: 'Resultado' }];
    recommendationService.getRecommendations.mockReturnValue(mockResult);

    const { result } = renderHook(() => useRecommendations(mockProducts));
    const formData = { some: 'data' };

    let recommendations;
    act(() => {
      recommendations = result.current.getRecommendations(formData);
    });

    expect(recommendationService.getRecommendations).toHaveBeenCalledWith(
      formData,
      mockProducts
    );
    expect(recommendations).toEqual(mockResult);
  });
});
