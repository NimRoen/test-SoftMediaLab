import React from 'react';

import Switcher from '../forms/Switcher';

type Props = {
  defaultValue?: boolean;
  preLabel?: string;
  postLabel?: string;
};

const SalarySwitcher: React.FC<Props> = ({ defaultValue, preLabel, postLabel }) => {
  return (
    <div className="form-switcher">
      {preLabel && <span className="form-preLabel">{preLabel}</span>}
      <Switcher isOn={defaultValue} name="salaryWithIRPF" />
      {postLabel && <span className="form-postLabel">{postLabel}</span>}
    </div>
  );
};

export default SalarySwitcher;
