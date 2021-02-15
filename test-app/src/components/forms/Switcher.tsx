import React from 'react';
import { Field } from 'redux-form';

type Props = {
  name: string;
  checked?: boolean;
};

const Switcher: React.FC<Props> = props => {
  const { name } = props;

  return (
    <label htmlFor={name}>
      <div className="form-checkbox"></div>
      <Field component="input" type="checkbox" {...props} />
    </label>
  );
};

export default Switcher;
