import { ReactComponent as SingleProductIcon } from '../../../assets/icons/single-product.svg';
import { ReactComponent as MultipleProductsIcon } from '../../../assets/icons/multiple-products.svg';
import { ReactComponent as CheckCircleIcon } from '../../../assets/icons/check-circle.svg';

function RecommendationType({
  selectedType,
  onRecommendationTypeChange,
  error,
}) {
  const options = [
    {
      id: 'SingleProduct',
      label: 'Produto Único',
      description: 'Recomendação focada',
      icon: <SingleProductIcon className="h-6 w-6" />,
    },
    {
      id: 'MultipleProducts',
      label: 'Múltiplos Produtos',
      description: 'Solução completa',
      icon: <MultipleProductsIcon className="h-6 w-6" />,
    },
  ];

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          Tipo de Recomendação
        </h3>
        {error && (
          <span className="text-xs font-medium text-red-500">{error}</span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = selectedType === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onRecommendationTypeChange(option.id)}
              className={`group relative flex cursor-pointer flex-col rounded-xl border p-4 text-left transition-all duration-200 ease-out hover:shadow-md ${
                isSelected
                  ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                }`}
              >
                {option.icon}
              </div>
              <span
                className={`block text-sm font-bold ${
                  isSelected ? 'text-blue-900' : 'text-gray-900'
                }`}
              >
                {option.label}
              </span>
              <span
                className={`mt-1 block text-xs ${
                  isSelected ? 'text-blue-700' : 'text-gray-500'
                }`}
              >
                {option.description}
              </span>

              {isSelected && (
                <div className="absolute right-4 top-4 text-blue-600">
                  <CheckCircleIcon className="h-5 w-5" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default RecommendationType;
