const CheckboxGroup = ({ title, options, selectedOptions = [], onChange, disabled }) => {
  
  const handleChange = (option) => {
    if (disabled) return;
    if (selectedOptions.includes(option)) {
      onChange(selectedOptions.filter((item) => item !== option));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  return (
    <div className="mb-4">

      <p className="font-medium text-gray-600 mb-2">
        {title}
      </p>

      <div className="grid grid-cols-3 gap-3">

        {options.map((item, index) => (
          <label key={index} className={`flex items-center gap-2 text-sm ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}>

            <input 
              type="checkbox" 
              className="accent-red-500" 
              checked={selectedOptions.includes(item)}
              onChange={() => handleChange(item)}
              disabled={disabled}
            />

            {item}

          </label>
        ))}

      </div>

    </div>
  );
};

export default CheckboxGroup;