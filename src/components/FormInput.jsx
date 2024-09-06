/* eslint-disable react/prop-types */
import React from 'react'

const FormInput = React.forwardRef(function FormInput(
  {
    isRequired,
    inputValue,
    onMouseEnter,
    onBlur,
    onFocus,
    onMouseLeave,
    inputLabel,
    labelFor,
    inputType = 'text',
    inputId,
    inputName,
    placeholderText,
    ariaLabelName,
    onChange,
    className,
    inputGroupClassNames,
    showPasswordRequirement,
    labelClasses,
    options, // New prop for select options
  },
  ref
) {
  return (
    <div className={inputGroupClassNames}>
      {inputLabel && (
        <div className='flex items-start'>
          <label
            className={`block text-[#101928] font-medium ${labelClasses}`}
            htmlFor={labelFor}
          >
            {inputLabel}
          </label>
          {isRequired && <span className='text-red-600 text-sm'>*</span>}
        </div>
      )}
      {inputType === 'select' ? (
        <select
          onMouseEnter={onMouseEnter}
          className={className}
          ref={ref}
          id={inputId}
          value={inputValue}
          name={inputName}
          aria-label={ariaLabelName}
          onChange={onChange}
          onMouseLeave={onMouseLeave}
          onBlur={onBlur}
          onFocus={onFocus}
          required={isRequired}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          onMouseEnter={onMouseEnter}
          className={className}
          ref={ref}
          type={inputType}
          id={inputId}
          value={inputValue}
          name={inputName}
          placeholder={placeholderText}
          aria-label={ariaLabelName}
          onChange={onChange}
          onMouseLeave={onMouseLeave}
          onBlur={onBlur}
          onFocus={onFocus}
          required={isRequired}
        />
      )}
      {inputType === 'password' && showPasswordRequirement && (
        <p className='text-sm text-[#667185] mt-2'>
          minimum 8 characters and special character
        </p>
      )}
    </div>
  )
})

export default FormInput
