import React, { PureComponent } from 'react';
import { AutosuggestionComponent } from '../Autosuggest-dropdown';

export interface ISelectWithAutoCompleteProps {
  getSelectedOption: (selectedOption: string) => void;
  values: Array<string>;
  value: string;
}

export class SelectWithAutoComplete extends PureComponent<
  ISelectWithAutoCompleteProps
> {
  state = { selectedOption: '' };

  getSelectedOption = (selectedOption: string) => {
    if (selectedOption && selectedOption !== this.state.selectedOption) {
      this.setState({ selectedOption, oldValue: this.props.value });
    }
  };

  getValue = () => this.state.selectedOption || this.props.value;
  render() {
    return (
      <AutosuggestionComponent
        {...this.props}
        getSelectedOption={this.getSelectedOption}
      />
    );
  }
}
