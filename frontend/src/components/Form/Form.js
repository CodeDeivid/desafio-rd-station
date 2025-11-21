import { useState } from 'react';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

function Form({ onUpdate, products, preferences, features }) {
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });
  const [errors, setErrors] = useState({});

  const { getRecommendations } = useRecommendations(products);

  const validate = () => {
    const newErrors = {};
    if (formData.selectedPreferences.length === 0) {
      newErrors.selectedPreferences = 'Selecione pelo menos uma preferência';
    }
    if (formData.selectedFeatures.length === 0) {
      newErrors.selectedFeatures = 'Selecione pelo menos uma funcionalidade';
    }
    if (!formData.selectedRecommendationType) {
      newErrors.selectedRecommendationType = 'Selecione o tipo de recomendação';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const dataRecommendations = getRecommendations(formData);

    if (onUpdate) {
      onUpdate(dataRecommendations);
    }
  };

  const handleFieldChange = (field, value) => {
    handleChange(field, value);
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleClearSelections = () => {
    handleFieldChange('selectedPreferences', []);
    handleFieldChange('selectedFeatures', []);
    setErrors({});
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Seus Critérios</h2>
          <p className="mt-1 text-sm text-gray-500">Personalize sua busca</p>
        </div>

        <button
          type="button"
          onClick={handleClearSelections}
          className="group flex items-center rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <span>Limpar filtros</span>
          <CloseIcon className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:scale-110" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-8">
        <div className="space-y-8">
          <Preferences
            preferences={preferences}
            selectedPreferences={formData.selectedPreferences}
            onPreferenceChange={(selected) =>
              handleFieldChange('selectedPreferences', selected)
            }
            error={errors.selectedPreferences}
          />

          <Features
            features={features}
            selectedFeatures={formData.selectedFeatures}
            onFeatureChange={(selected) =>
              handleFieldChange('selectedFeatures', selected)
            }
            error={errors.selectedFeatures}
          />

          <RecommendationType
            selectedType={formData.selectedRecommendationType}
            onRecommendationTypeChange={(selected) =>
              handleFieldChange('selectedRecommendationType', selected)
            }
            error={errors.selectedRecommendationType}
          />
        </div>

        <div className="mt-auto pt-4">
          <SubmitButton text="Obter recomendação" />
        </div>
      </form>
    </div>
  );
}

export default Form;
