import { Formiz, FormizStep, useForm } from "@formiz/core";
import { isEmail } from "@formiz/validations";
import { useState } from 'react';
import { MyField } from './components/MyField/index';
import { SelectField } from "./components/SelectField";

const genders = [
  {
    id: 1,
    text: "Masculino",
    value: "Masculino"
  },
  {
    id: 2,
    text: "Feminino",
    value: "Feminino"
  }
]

function App() {
  const myForm = useForm();
  const [ isLoading, setIsLoading ] = useState(false)

  function submitForm(values: any) {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      console.log(values)

      myForm.invalidateFields({
        email: 'You can display an error after an API call'
      })

      const step = myForm.getFieldStepName('email')
    }, 1000)
  }


  return (
    <Formiz onValidSubmit={submitForm} connect={myForm}>
      <form 
        noValidate
        onSubmit={myForm.submitStep}
      >
        <div>
          <FormizStep name="step1">
            <MyField name="name" label="Name" required="Name obrigatorio"/>
            <MyField name="nickname" label="Nickname"/>
          </FormizStep> 

          <FormizStep name="step2">
            <MyField 
              type="email" 
              name="email" 
              label="email" 
              required="E-mail obrigatorio"
              validations={[
                {
                  rule: isEmail(),
                  message: 'Nao é um email valido'
                }
              ]}  
            />

            <SelectField name="gender" label="Genero" required="Genero obrigatorio" itens={genders}/>
          </FormizStep> 
          <FormizStep name="step3">
            <MyField 
              type="password" 
              name="password" 
              label="Palavra-passe" 
            />

            <MyField 
              type="password" 
              name="passwordConfirm" 
              label="Confirm palavra-passe" 
              validations={[
                {
                  rule: (value) => myForm.values.password === value,
                  deps: [myForm.values.password],
                  message: 'Password do not match!'
                }
              ]}
            />
          </FormizStep> 
        </div>

        <div>
          <div>
            {!myForm.isFirstStep && (
              <button type="button" onClick={myForm.prevStep}>
                Anterior
              </button>
            )}
          </div>
          <div>
            Passo
            {' '}
            { myForm.currentStep && myForm.currentStep.index + 1 || 0 }
            {' '}l
            de
            { myForm.steps?.length }
          </div>
          <div>
            {myForm.isLastStep ? (
              <button type="submit" disabled={isLoading || (!myForm.isValid && myForm.isStepSubmitted)}>
                {isLoading ? 'Loading...' : 'Salvar'}
              </button>
            ) : (
              <button type="submit" disabled={!myForm.isStepValid && myForm.isStepSubmitted}>
                Próximo
              </button>
            ) }
          </div>
        </div>          
      </form>
     
    </Formiz>
  );
}

export default App
