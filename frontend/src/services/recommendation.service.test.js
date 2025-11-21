import recommendationService from './recommendation.service';
import mockProducts from '../mocks/mockProducts';

describe('recommendationService', () => {
  test('deve retornar array vazio se não houver produtos ou dados do formulário', () => {
    expect(recommendationService.getRecommendations({}, [])).toEqual([]);
    expect(
      recommendationService.getRecommendations(null, mockProducts)
    ).toEqual([]);
  });

  test('SingleProduct: deve retornar o melhor produto baseado nas preferências', () => {
    const formData = {
      selectedPreferences: ['Integração fácil com ferramentas de e-mail'],
      selectedFeatures: ['Gestão de leads e oportunidades'],
      selectedRecommendationType: 'SingleProduct',
    };

    const result = recommendationService.getRecommendations(
      formData,
      mockProducts
    );
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('RD Station CRM');
  });

  test('SingleProduct: deve escolher o último em caso de empate de pontuação', () => {
    const products = [
      { id: 1, name: 'A', preferences: ['X'], features: [] },
      { id: 2, name: 'B', preferences: ['X'], features: [] },
    ];
    const formData = {
      selectedPreferences: ['X'],
      selectedRecommendationType: 'SingleProduct',
    };

    const result = recommendationService.getRecommendations(formData, products);
    expect(result[0].name).toBe('B');
  });

  test('MultipleProducts: deve retornar produtos ordenados por pontuação', () => {
    const products = [
      { id: 1, name: 'Low', preferences: ['A'], features: [] },
      { id: 2, name: 'High', preferences: ['A', 'B'], features: [] },
    ];
    const formData = {
      selectedPreferences: ['A', 'B'],
      selectedRecommendationType: 'MultipleProducts',
    };

    const result = recommendationService.getRecommendations(formData, products);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('High');
    expect(result[1].name).toBe('Low');
  });

  test('deve retornar vazio se nenhuma preferência der match', () => {
    const formData = {
      selectedPreferences: ['Inexistente'],
      selectedRecommendationType: 'SingleProduct',
    };

    const result = recommendationService.getRecommendations(
      formData,
      mockProducts
    );
    expect(result).toEqual([]);
  });
});
