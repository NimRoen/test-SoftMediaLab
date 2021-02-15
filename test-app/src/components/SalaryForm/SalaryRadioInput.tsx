import React from 'react';

import RadioInput, { RadioInputProps } from '../forms/RadioInput';

import { FROM_SALARY_TYPE } from './constants';
import { SalaryType } from './SalaryRadioList';

type Props = {
  value: SalaryType;
  checked?: boolean;
  tooltip?: string;
};

const SalaryRadioInput: React.FC<Props & Omit<RadioInputProps, 'name'>> = props => {
  return <RadioInput name={FROM_SALARY_TYPE} {...props} />;
};

export default SalaryRadioInput;
