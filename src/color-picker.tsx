import React from 'react';

export const ColorPicker = ({
  name,
  label,
  value,
  setValue,
}: {
  label?: string;
  value?: string;
  name?: string;
  setValue: (newValue: string) => void;
}) => (
  <div className="flex flex-row gap-2 items-center">
    <label>{label ?? ''}</label>
    <input
      name={name}
      type="color"
      value={value ?? ''}
      onChange={(e) => {
        e.persist();
        const newColor = e?.target?.value;
        setValue(newColor);
      }}
    />
  </div>
);
