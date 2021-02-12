import React from 'react';
import InputField from '../forms/InputField';

type Props = {
  postLabel?: string;
};

const SalaryInput: React.FC<Props> = ({ postLabel }) => {
  return (
    <div className="form-inputField">
      <InputField name="salaryValue" />
      {postLabel && <span className="form-postLabel">{postLabel}</span>}
    </div>
  );
};

export default SalaryInput;
