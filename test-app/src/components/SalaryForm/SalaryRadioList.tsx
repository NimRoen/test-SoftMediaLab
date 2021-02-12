import React from 'react';

import json from '../../data/forms.json';

import SalaryRadioInput from './SalaryRadioInput';

export const salaryTypes = {
  HOURLY: 'hourlySalary',
  DAILY: 'dailySalary',
  MONTHLY: 'monthlySalary',
  MONTHLY_MINIMAL: 'monthlySalaryMinimal',
} as const;

export type SalaryType = typeof salaryTypes[keyof typeof salaryTypes];

const salaryFormOptions = [
  { value: salaryTypes.MONTHLY },
  { value: salaryTypes.MONTHLY_MINIMAL, tooltip: 'salaryMinimalTooltip' },
  { value: salaryTypes.DAILY },
  { value: salaryTypes.HOURLY },
] as { value: SalaryType, toolip?: string }[];

const SalaryRadioList: React.FC = () => {
  return (
    <fieldset className="form-radioList">
      {salaryFormOptions.map((salaryFormOption, index) => {
        const { value } = salaryFormOption;

        return <SalaryRadioInput key={`salaryFormOption-${index}`} {...salaryFormOption} label={json[value]} />
      })}
    </fieldset>
  );
};

export default SalaryRadioList;
