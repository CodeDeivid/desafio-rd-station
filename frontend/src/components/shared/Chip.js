import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';

function Chip({ children, selected = false, className = '', ...props }) {
  const base =
    'group flex w-full items-center justify-start px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl text-xs sm:text-sm font-medium border transition-all duration-200 ease-out cursor-pointer select-none text-left active:scale-95';
  const selectedClasses =
    'bg-blue-600 text-white border-blue-600 shadow-md hover:bg-blue-700 hover:shadow-lg transform scale-[1.02] hover:scale-[1.03]';
  const unselectedClasses =
    'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-sm transform hover:scale-[1.02]';

  const classes = `${base} ${
    selected ? selectedClasses : unselectedClasses
  } ${className}`;

  return (
    <button
      type="button"
      className={classes}
      aria-pressed={selected}
      {...props}
    >
      {selected ? (
        <CheckIcon className="mr-2 h-4 w-4 flex-shrink-0 sm:mr-3 sm:h-5 sm:w-5" />
      ) : (
        <PlusIcon className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-blue-400 sm:mr-3 sm:h-5 sm:w-5" />
      )}
      <span className="flex-1">{children}</span>
    </button>
  );
}

export default Chip;
