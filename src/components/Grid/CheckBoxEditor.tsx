import React, { PureComponent } from 'react';
import { ITrades } from '../../types';
import { Checkbox } from '@blueprintjs/core';
interface IAgGridCheckBoxProps {
  value: boolean;
  data: ITrades;
  action: (data: ITrades) => void;
}
interface IAgGridCheckBoxState {
  selectedOption: boolean;
}

export class CheckBoxEditor extends PureComponent<
  IAgGridCheckBoxProps,
  IAgGridCheckBoxState
> {
  constructor(props) {
    super(props);
    this.state = { selectedOption: props.value || false };
  }

  handleClick = () => {
    this.setState({ selectedOption: !this.state.selectedOption });
  };

  getValue = () => this.state.selectedOption;
  render() {
    return (
      <Checkbox
        className="checkbox"
        inputRef={node => {
          node && setTimeout(() => node.focus(), 0);
        }}
        type="checkbox"
        checked={this.state.selectedOption}
        onClick={this.handleClick}
      />
    );
  }
}
