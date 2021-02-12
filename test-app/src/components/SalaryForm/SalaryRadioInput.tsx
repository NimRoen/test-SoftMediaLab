import React from 'react';

import RadioInput, { RadioInputProps } from '../forms/RadioInput';
import { SalaryType } from './SalaryRadioList';

type Props = {
  value: SalaryType;
  checked?: boolean;
  tooltip?: string;
};

const SalaryRadioInput: React.FC<Props & Omit<RadioInputProps, 'name'>> = props => {
  return <RadioInput {...props} name="salaryType" />;
};

export default SalaryRadioInput;
