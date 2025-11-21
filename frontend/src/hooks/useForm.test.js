import { renderHook, act } from '@testing-library/react';
import useForm from './useForm';

describe('useForm Hook', () => {
  test('deve inicializar com o estado fornecido', () => {
    const initialState = { name: '', age: 0 };
    const { result } = renderHook(() => useForm(initialState));

    expect(result.current.formData).toEqual(initialState);
  });

  test('deve atualizar um campo corretamente', () => {
    const initialState = { name: '', age: 0 };
    const { result } = renderHook(() => useForm(initialState));

    act(() => {
      result.current.handleChange('name', 'João');
    });

    expect(result.current.formData.name).toBe('João');
    expect(result.current.formData.age).toBe(0);
  });
});
