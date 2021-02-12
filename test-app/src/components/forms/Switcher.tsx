import React, { useState } from 'react';
import { Field } from 'redux-form';

type Props = {
  name: string;
  isOn?: boolean;
  onClick?: () => void;
};

const Switcher: React.FC<Props> = ({ name, isOn, onClick }) => {
  const [on, setOn] = useState(isOn || false);

  return (
    <label htmlFor={name} onClick={() => {
      setOn(!on);

      if(onClick) {
        onClick();
      }
    }}>
      <div className="form-checkbox"></div>
      <Field name={name} component="input" type="checkbox" checked={on} />
    </label>
  );
};

export default Switcher;
