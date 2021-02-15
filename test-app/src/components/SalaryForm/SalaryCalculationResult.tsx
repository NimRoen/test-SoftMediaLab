import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import styled from 'styled-components';

import { FORM_SALARY_CALCULATOR } from '../constants';

import { numberFormat } from '../../lib/string';
import json from '../../data/forms.json';

import { FORM_SALARY_VALUE, FROM_SALARY_TYPE, FROM_SALARY_WITHOUT_IRPF } from './constants';
import { SalaryType, salaryTypes } from './SalaryRadioList';

const Container = styled.div`
  margin-top: 20px;
  padding: 22px;
  background-color: ${p => p.theme.colors.yellow};
`;

const ResultInfo = styled.p`
  &:last-child {
    margin-bottom: 0;
  }
`;

const ResultValue = styled.span`
  font-weight: 900;
`;

const ResultDescription = styled.span``;

const resultKeys = {
  salary: 'salary',
  irpf: 'irpf',
  salaryTotal: 'salaryTotal',
} as const;

type KeysType = keyof typeof resultKeys;

type StateProps = { [key in KeysType]: number };

type Props = {
  salaryType: SalaryType;
  salaryValue: string;
  salaryWithoutIRPF: boolean;
};

class SalaryCalculationResult extends Component<Props, StateProps> {
  state = {
    salary: 0,
    irpf: 0,
    salaryTotal: 0,
  };

  isShowResult() {
    const { salaryType, salaryValue } = this.props;
    const salary = !!salaryValue ? Number(salaryValue.replace(/\D/g, '')) : 0;

    if (salaryType === salaryTypes.MONTHLY && salary > 0) {
      return true;
    }
  
    return false;
  }

  calculateResult() {
    const { salaryValue, salaryWithoutIRPF } = this.props;
    const newState = this.state;

    if (salaryWithoutIRPF) {
      newState.salary = Number(salaryValue);
      newState.salaryTotal = newState.salary / 0.87;
      newState.irpf = newState.salaryTotal - newState.salary;
    }
    else {
      newState.salaryTotal = Number(salaryValue);
      newState.irpf = newState.salaryTotal * 0.13;
      newState.salary = newState.salaryTotal - newState.irpf;
    }

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
          const resultValue = Math.round(this.state[key]);

          if (!!!resultValue) {
            return null;
          }

          return (
            <ResultInfo key={`salaryResultInfo-${key}`}>
              <ResultValue>{numberFormat(resultValue.toString())} {json.currency} </ResultValue>
              <ResultDescription>{json[key]}</ResultDescription>
            </ResultInfo>
          );
        })}
      </Container>
    );
  }
}

const selector = formValueSelector(FORM_SALARY_CALCULATOR);

export default connect<Props>(state => {
  const salaryType = selector(state, FROM_SALARY_TYPE);
  const salaryValue = selector(state, FORM_SALARY_VALUE);
  const salaryWithoutIRPF = selector(state, FROM_SALARY_WITHOUT_IRPF);

  return {
    salaryType,
    salaryValue,
    salaryWithoutIRPF,
  }
})(SalaryCalculationResult);
