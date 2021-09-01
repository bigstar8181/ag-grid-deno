import React from 'react';
import { Checkbox, Classes } from '@blueprintjs/core';
interface ICheckBoxProps {
  value: boolean;
}

export function CheckBoxRenderer({ value }: ICheckBoxProps) {
  console.log('render');
  return (
    <>
      <Checkbox
        className="checkbox"
        type="checkbox"
        checked={value === true || false}
      />
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0
        }}
      />
    </>
  );
}
