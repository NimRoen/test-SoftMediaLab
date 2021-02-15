import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector, InjectedFormProps } from 'redux-form';

import { FORM_SALARY_CALCULATOR } from '../constants';

import { FROM_SALARY_TYPE } from './constants';
import SalaryCalculatorForm from './SalaryCalculatorForm';
import { SalaryType, salaryTypes } from './SalaryRadioList';

const submitForm = (_formData: object) => {};

type Props = {
  initialValues: object;
  salaryType: SalaryType;
};

const DummyFormContainer: React.FC<Props & Pick<InjectedFormProps<{}, Props>, 'initialValues'>> = props => {
  return <SalaryCalculatorForm onSubmit={submitForm} {...props} />;
};

const selector = formValueSelector(FORM_SALARY_CALCULATOR);

const withConnect = connect<Props>(state => {
  const salaryType = selector(state, FROM_SALARY_TYPE);

  return {
    initialValues: {
      salaryType: salaryTypes.MONTHLY,
      salaryWithoutIRPF: true,
    },
    salaryType,
  };
});

export default withConnect(DummyFormContainer);
