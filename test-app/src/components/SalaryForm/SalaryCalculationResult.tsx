import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import styled from 'styled-components';

import json from '../../data/forms.json';
import { FORM_SALARY_CALCULATOR } from '../constants';
import { SalaryType, salaryTypes } from './SalaryRadioList';

const Container = styled.div``;

const ResultInfo = styled.p``;

const ResultValue = styled.span``;

const ResultDescription = styled.span``;

const resultKeys = {
  CLEAR_INCOMING: 'clearIncomingValue',
  IPRF_VALUE: 'IRPFValue',
  TOTALLY_INCOMING: 'monthlyIncomingValue',
} as const;

type KeysType = typeof resultKeys[keyof typeof resultKeys];

type StateProps = { [key in KeysType]: number };

type Props = {
  salaryType: SalaryType;
  salaryValue: string;
  salaryWithIRPF: boolean;
};

class SalaryCalculationResult extends Component<Props, StateProps> {
  state = {
    [resultKeys.CLEAR_INCOMING]: 0,
    [resultKeys.IPRF_VALUE]: 0,
    [resultKeys.TOTALLY_INCOMING]: 0,
  };

  isShowResult() {
    const { salaryType } = this.props;
  
    return !!salaryType ? salaryType === salaryTypes.MONTHLY : true;
  }

  calculateResult() {
    const { salaryValue, salaryWithIRPF } = this.props;
    const newState = this.state;

    const salary = Number(salaryValue);
    const irpf = salary * 0.13;
    
    // переменная введена, потому что не успел разобраться как в redux-form передаются дефолтные значения
    const useIRPF = salaryWithIRPF === undefined ? true : salaryWithIRPF;

    newState[resultKeys.CLEAR_INCOMING] = salary - (useIRPF ? irpf : 0);
    newState[resultKeys.TOTALLY_INCOMING] = salary + (useIRPF ? 0 : irpf);
    newState[resultKeys.IPRF_VALUE] = irpf;

    this.setState(newState);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.isShowResult() && prevProps !== this.props) {
      this.calculateResult();
    }
  }

  render() {
    const keys = Object.keys(this.state) as KeysType[];

    if (!this.isShowResult()) {
      return null;
    }

    return (
      <Container>
        {keys.map(key => {
          const resultValue = this.state[key];

          if (!!!resultValue) {
            return null;
          }

          return (
            <ResultInfo key={`salaryResultInfo-${key}`}>
              <ResultValue>{resultValue} {json.currency}</ResultValue>
              <ResultDescription>{json[key]}</ResultDescription>
            </ResultInfo>
          );
        })}
      </Container>
    );
  }
}

const selector = formValueSelector(FORM_SALARY_CALCULATOR);

export default connect(state => {
  const salaryType = selector(state, 'salaryType');
  const salaryValue = selector(state, 'salaryValue');
  const salaryWithIRPF = selector(state, 'salaryWithIRPF');

  return {
    salaryType,
    salaryValue,
    salaryWithIRPF,
  }
})(SalaryCalculationResult);
