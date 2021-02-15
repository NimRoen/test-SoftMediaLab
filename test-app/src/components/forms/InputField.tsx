import React from 'react';
import { Field } from 'redux-form';

import { numberFormat } from '../../lib/string';

type Props = {
  name: string;
  placeholder?: string;
};

const valueFormatter = (value: string) => {
  if (!value) return '';

  const onlyDigits = value.replace(/\D/g, '');

  return numberFormat(onlyDigits);
};

const valueParser = (value: string) => value.replace(/\D/g, '');

const InputField: React.FC<Props> = props => {
  return <Field
    component="input"
    type="text"
    format={valueFormatter}
    parse={valueParser}
    {...props}
  />
};

export default InputField;
