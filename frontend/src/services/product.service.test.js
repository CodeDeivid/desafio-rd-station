import getProducts from './product.service';

describe('productService', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('deve retornar a lista de produtos em caso de sucesso', async () => {
    const mockData = [{ id: 1, name: 'Produto 1' }];

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await getProducts();

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/products');
    expect(result).toEqual(mockData);
  });

  test('deve lançar erro em caso de falha na requisição (network error)', async () => {
    const mockError = new Error('Erro de rede');
    global.fetch.mockRejectedValue(mockError);

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => { });

    await expect(getProducts()).rejects.toThrow('Erro de rede');

    expect(consoleSpy).toHaveBeenCalledWith(
      'Erro ao obter os produtos:',
      mockError
    );
    consoleSpy.mockRestore();
  });

  test('deve lançar erro se a resposta não for ok', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
    });

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => { });

    await expect(getProducts()).rejects.toThrow('Erro HTTP: 500');

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
