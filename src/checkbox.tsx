import React from 'react';

export const Checkbox = ({
  label,
  name,
  checked,
  onChange,
}: {
  label?: string;
  name?: string;
  checked?: boolean;
  onChange: (newVal) => void;
}) => (
  <div className="flex flex-row gap-2 items-center">
    <label>{label ?? ''}</label>
    <input
      type="checkbox"
      name={name}
      checked={checked ?? false}
      onChange={(e) => {
        e.persist();
        onChange(!checked);
      }}
    />
  </div>
);
