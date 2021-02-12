import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';

import { FORM_SALARY_CALCULATOR } from '../constants';

import json from '../../data/forms.json';

import SalarySwitcher from './SalarySwitcher';
import SalaryRadioList from './SalaryRadioList';
import SalaryInput from './SalaryInput';
import SalaryCalculationResult from './SalaryCalculationResult';

import './form.scss';

type Props = {
  onSubmit: (formData: {}) => void;
};

const SalaryCalculatorForm: React.FC<Props & InjectedFormProps<{}, Props>> = props => {
  const { onSubmit, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <div className="form-caption">{json.summary}</div>
        <SalaryRadioList />
        <SalarySwitcher
          defaultValue={true}
          preLabel={json.withIRPF}
          postLabel={json.withoutIRPF}
        />
        <SalaryInput postLabel={json.currency} />
      </section>
      <section>
        <SalaryCalculationResult />
      </section>
    </form>
  );
};

export default reduxForm<{}, Props>({
  form: FORM_SALARY_CALCULATOR,
})(SalaryCalculatorForm);
