import React, { Component } from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';

import { FORM_SALARY_CALCULATOR } from '../constants';

import json from '../../data/forms.json';

import SalarySwitcher from './SalarySwitcher';
import SalaryRadioList, { SalaryType, salaryTypes } from './SalaryRadioList';
import SalaryInput from './SalaryInput';
import SalaryCalculationResult from './SalaryCalculationResult';

import '../../styles/form.scss';

type Props = {
  salaryType: SalaryType;
};

class SalaryCalculatorForm extends Component<Props & InjectedFormProps<{}, Props>> {
  render() {
    const { salaryType, handleSubmit } = this.props;
    const showInput = salaryType !== salaryTypes.MONTHLY_MINIMAL;

    return (
      <form onSubmit={handleSubmit}>
        <section>
          <div className="form-caption">{json.summary}</div>
          <SalaryRadioList />
          <SalarySwitcher
            preLabel={json.withIRPF}
            postLabel={json.withoutIRPF}
          />
          {showInput && <SalaryInput postLabel={json.currency} />}
        </section>
        <section>
          <SalaryCalculationResult />
        </section>
      </form>
    );
  }
}

export default reduxForm<{}, Props>({
  form: FORM_SALARY_CALCULATOR,
})(SalaryCalculatorForm);
