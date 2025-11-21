import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Form from './Form';
import mockProducts from '../../mocks/mockProducts';

jest.mock('../../hooks/useRecommendations', () => ({
  __esModule: true,
  default: () => ({
    getRecommendations: jest
      .fn()
      .mockReturnValue([{ id: 1, name: 'Produto Teste' }]),
  }),
}));

const mockPreferences = ['Pref A', 'Pref B'];
const mockFeatures = ['Feat A', 'Feat B'];

describe('Form Component', () => {
  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve renderizar o formulário corretamente', () => {
    render(
      <Form
        onUpdate={mockOnUpdate}
        products={mockProducts}
        preferences={mockPreferences}
        features={mockFeatures}
      />
    );

    expect(screen.getByText('Seus Critérios')).toBeInTheDocument();
    expect(screen.getByText('Pref A')).toBeInTheDocument();
    expect(screen.getByText('Feat A')).toBeInTheDocument();
    expect(screen.getByText('Produto Único')).toBeInTheDocument();
  });

  test('deve exibir erros de validação ao submeter vazio', () => {
    render(
      <Form
        onUpdate={mockOnUpdate}
        products={mockProducts}
        preferences={mockPreferences}
        features={mockFeatures}
      />
    );

    const submitButton = screen.getByText('Obter recomendação');
    fireEvent.click(submitButton);

    expect(mockOnUpdate).not.toHaveBeenCalled();
  });

  test('deve chamar onUpdate com recomendações ao preencher e submeter', async () => {
    render(
      <Form
        onUpdate={mockOnUpdate}
        products={mockProducts}
        preferences={mockPreferences}
        features={mockFeatures}
      />
    );

    fireEvent.click(screen.getByText('Pref A'));
    fireEvent.click(screen.getByText('Feat A'));
    fireEvent.click(screen.getByText('Produto Único'));

    const submitButton = screen.getByText('Obter recomendação');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith([
        { id: 1, name: 'Produto Teste' },
      ]);
    });
  });

  test('deve limpar os filtros ao clicar em "Limpar filtros"', () => {
    render(
      <Form
        onUpdate={mockOnUpdate}
        products={mockProducts}
        preferences={mockPreferences}
        features={mockFeatures}
      />
    );

    const prefBtn = screen.getByText('Pref A');
    fireEvent.click(prefBtn);

    const clearButton = screen.getByText('Limpar filtros');
    fireEvent.click(clearButton);

    const submitButton = screen.getByText('Obter recomendação');
    fireEvent.click(submitButton);

    expect(mockOnUpdate).not.toHaveBeenCalled();
  });
});
