import Chip from '../../shared/Chip';

function Preferences({
  preferences,
  selectedPreferences = [],
  onPreferenceChange,
  error,
}) {
  const handlePreferenceChange = (preference) => {
    const alreadySelected = selectedPreferences.includes(preference);

    const updatedPreferences = alreadySelected
      ? selectedPreferences.filter((pref) => pref !== preference)
      : [...selectedPreferences, preference];

    onPreferenceChange(updatedPreferences);
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          Preferências
        </h3>
        {error && (
          <span className="text-xs font-medium text-red-500">{error}</span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
        {preferences.map((preference, index) => (
          <Chip
            key={index}
            selected={selectedPreferences.includes(preference)}
            onClick={() => handlePreferenceChange(preference)}
            className="h-full w-full"
          >
            {preference}
          </Chip>
        ))}
      </div>
    </div>
  );
}

export default Preferences;
