import { useField, FieldProps } from '@formiz/core' 
import { useState } from 'react';
import PropTypes from 'prop-types'

interface PropsFields extends FieldProps {
  label: string;
  type?: string;
  required?: string;
}

export function MyField(props: PropsFields) {
  const { 
    errorMessage, 
    id, 
    isValid, 
    isPristine, 
    isSubmitted, 
    resetKey, 
    setValue, 
    value,
  } = useField(props)

  const { label, type, required} = props
  const [ isFocused, setIsFocused ]  = useState<Boolean>(false)
  const showError = !isValid && !isFocused && (!isPristine || isSubmitted)
  
  return (
    <div>
      <label htmlFor={id}>
        { label }
        { required && '*'}
      </label>
      
      <input 
        key={resetKey}
        id={id}
        type={type || 'text'}
        value={value ?? ''}
        onChange={event => setValue(event.target.value)} 
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {showError && (
        <div>
          {errorMessage}
        </div>
      )}
    </div>
  );
}