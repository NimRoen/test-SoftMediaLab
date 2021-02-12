import React from 'react';
import { Field } from 'redux-form';

type Props = {
  name: string;
  placeholder?: string;
};

const InputField: React.FC<Props> = props => {
  return <Field component="input" type="text" {...props} />
};

export default InputField;
