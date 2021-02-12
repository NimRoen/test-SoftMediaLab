import React from 'react';
import { Field } from 'redux-form';

export type RadioInputProps = {
  name: string;
  value: string;
  label: string;
  checked?: boolean;
};

const RadioInput: React.FC<RadioInputProps> = props => {
  const { label } = props;

  return (
    <label className="form-radio">
      <Field {...props} component="input" type="radio" hidden={true} />
      <span>{label}</span>
    </label>
  );
};

export default RadioInput;
