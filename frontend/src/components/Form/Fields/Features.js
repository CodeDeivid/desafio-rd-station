import Chip from '../../shared/Chip';

function Features({ features, selectedFeatures = [], onFeatureChange, error }) {
  const handleFeatureChange = (feature) => {
    const alreadySelected = selectedFeatures.includes(feature);

    const updatedFeatures = alreadySelected
      ? selectedFeatures.filter((f) => f !== feature)
      : [...selectedFeatures, feature];

    onFeatureChange(updatedFeatures);
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          Funcionalidades
        </h3>
        {error && (
          <span className="text-xs font-medium text-red-500">{error}</span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
        {features.map((feature, index) => (
          <Chip
            key={index}
            selected={selectedFeatures.includes(feature)}
            onClick={() => handleFeatureChange(feature)}
            className="h-full w-full"
          >
            {feature}
          </Chip>
        ))}
      </div>
    </div>
  );
}

export default Features;
