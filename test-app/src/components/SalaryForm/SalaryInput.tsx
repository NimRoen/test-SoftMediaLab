import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import json from '../../data/forms.json';

import { FORM_SALARY_CALCULATOR } from '../constants';
import InputField from '../forms/InputField';

import { FORM_SALARY_VALUE, FROM_SALARY_TYPE } from './constants';
import { SalaryType, salaryTypes } from './SalaryRadioList';

type ConnectProps = {
  salaryType: SalaryType;
};

type Props = {
  postLabel?: string;
} & ConnectProps;

const SalaryInput: React.FC<Props> = ({ postLabel, salaryType }) => {
  return (
    <div className="form-inputField">
      <InputField name={FORM_SALARY_VALUE} />
      {postLabel && <span className="form-postLabel">
        {postLabel}
        {salaryType === salaryTypes.DAILY && ` ${json.perDay}`}
        {salaryType === salaryTypes.HOURLY && ` ${json.perHour}`}
      </span>}
    </div>
  );
};

const selector = formValueSelector(FORM_SALARY_CALCULATOR);

export default connect<ConnectProps>(state => {
  const salaryType = selector(state, FROM_SALARY_TYPE);

  return {
    salaryType,
  };
})(SalaryInput);
