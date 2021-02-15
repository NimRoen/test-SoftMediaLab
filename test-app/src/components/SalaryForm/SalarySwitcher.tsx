import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import Switcher from '../forms/Switcher';
import { FORM_SALARY_CALCULATOR } from '../constants';

import { FROM_SALARY_WITHOUT_IRPF } from './constants';

type ConnectProps = {
  salaryWithoutIRPF: boolean;
};

type Props = {
  preLabel?: string;
  postLabel?: string;
} & ConnectProps;

const SalarySwitcher: React.FC<Props> = ({ preLabel, postLabel, salaryWithoutIRPF }) => {
  return (
    <div className="form-switcher">
      {preLabel && (
        <span className={`form-preLabel ${salaryWithoutIRPF ? 'disabled' : ''}`}>
          {preLabel}
        </span>
      )}
      <Switcher checked={salaryWithoutIRPF} name={FROM_SALARY_WITHOUT_IRPF} />
      {postLabel && (
        <span className={`form-postLabel ${salaryWithoutIRPF ? '' : 'disabled'}`}>
          {postLabel}
        </span>
      )}
    </div>
  );
};

const selector = formValueSelector(FORM_SALARY_CALCULATOR);

export default connect<ConnectProps>(state => {
  const salaryWithoutIRPF = selector(state, FROM_SALARY_WITHOUT_IRPF);

  return {
    salaryWithoutIRPF,
  };
})(SalarySwitcher);
