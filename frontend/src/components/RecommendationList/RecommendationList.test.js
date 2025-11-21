import { render, screen } from '@testing-library/react';
import RecommendationList from './RecommendationList';

const mockRecommendations = [
  {
    id: 1,
    name: 'Produto A',
    category: 'Categoria A',
    features: ['Feat 1', 'Feat 2'],
    preferences: ['Pref 1'],
  },
  {
    id: 2,
    name: 'Produto B',
    category: 'Categoria B',
    features: [],
    preferences: [],
  },
];

describe('RecommendationList Component', () => {
  test('deve renderizar mensagem quando não há recomendações', () => {
    render(<RecommendationList recommendations={[]} />);
    expect(
      screen.getByText(/Nenhuma recomendação encontrada/i)
    ).toBeInTheDocument();
  });

  test('deve renderizar lista de recomendações corretamente', () => {
    render(<RecommendationList recommendations={mockRecommendations} />);

    expect(screen.getByText('Produto A')).toBeInTheDocument();
    expect(screen.getByText('Categoria A')).toBeInTheDocument();
    expect(screen.getByText('Produto B')).toBeInTheDocument();
    expect(screen.getByText('Categoria B')).toBeInTheDocument();
  });

  test('deve renderizar funcionalidades e preferências de um produto', () => {
    render(<RecommendationList recommendations={[mockRecommendations[0]]} />);

    expect(screen.getByText('Feat 1')).toBeInTheDocument();
    expect(screen.getByText('Feat 2')).toBeInTheDocument();
    expect(screen.getByText('Pref 1')).toBeInTheDocument();
  });
});
