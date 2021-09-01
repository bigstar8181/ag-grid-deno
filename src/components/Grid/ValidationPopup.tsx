import React, { useState, useLayoutEffect, useEffect } from 'react';

import './Grid.scss';
import { Icon, Intent } from '@blueprintjs/core';

interface IValidationProps {
  target: HTMLDivElement;
  message: string;
}

export function ValidationPopup({ target, message }: IValidationProps) {
  const [props, setProps] = useState<Record<string, HTMLDivElement>>({
    target
  });

  function handleScroll() {
    setProps(function({ target }: Record<string, HTMLDivElement>) {
      return { target };
    });
  }

  useLayoutEffect(function() {
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, []);

  useEffect(() => {
    setProps({ target });
  }, [target]);

  const x = props.target.getBoundingClientRect().left;
  const y = props.target.getBoundingClientRect().bottom;
  const width = props.target.getBoundingClientRect().width;

  return (
    <div
      className="validation-popup"
      style={{
        transform: `translate3d(${x}px,${y}px,0)`,
        width
      }}
    >
      <Icon
        className="validation-popup__icon"
        icon="error"
        intent={Intent.DANGER}
        iconSize={Icon.SIZE_STANDARD}
      />
      {message}
    </div>
  );
}
