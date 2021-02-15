import React from 'react';
import { Field } from 'redux-form';

import Tooltip, { TooltipHandlerProps } from '../Tooltip/Tooltip';

export type RadioInputProps = {
  name: string;
  value: string;
  label: string;
  checked?: boolean;
  tooltip?: string;
};

const RadioInput: React.FC<RadioInputProps> = ({ tooltip, label, ...props }) => {
  return (
    <div className="form-radio">
      <label>
        <Field {...props} component="input" type="radio" />
        <span>{label}</span>
      </label>
      {tooltip && (
        <Tooltip id='radio-info' content={tooltip}>
          {(tooltipHandlerProps: TooltipHandlerProps) => {
            const { show, ...props } = tooltipHandlerProps;
            return (
              <span
                className={`form-tooltip ${show ? 'showed' : ''}`}
                {...props}
              />
            );
          }}
        </Tooltip>
      )}
    </div>
  );
};

export default RadioInput;
