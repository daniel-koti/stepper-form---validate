import { useField, FieldProps } from '@formiz/core' 
import { useState } from 'react';
import PropTypes from 'prop-types'

interface ItemsPropsSelect {
  id: number;
  text: string;
  value: string;
}

interface PropsFields extends FieldProps {
  label: string;
  type?: string;
  required?: string;
  itens: ItemsPropsSelect[];
  name: string;
}

export function SelectField(props: PropsFields) {
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
    <>
      <label htmlFor={id}>
        { label }
        { required && '*'}
      </label>

   
      <select
        key={resetKey}
        id={id} 
        onChange={event => setValue(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        defaultValue={0} >
          <option >Seleccione uma opção</option>
          {props.itens && props.itens.map((item, key: any) => (
              <option value={item.value} key={key}> {item.text} </option>
          ))
          }
      </select>
      {showError && (
        <div>
          {errorMessage}
        </div>
      )}
    </>
  );
}