import React, { PureComponent } from 'react';
import { DateInput } from '@blueprintjs/datetime';
import { getDateFormatted } from './utils/grid';

export interface ISelectWithAutoCompleteProps {
  getSelectedOption: (selectedOption: string) => void;
  value: string;
}

export interface ISelectWithAutoCompleteState {
  selectedOption: Date;
}

export class AgGridDatePickerEditor extends PureComponent<
  ISelectWithAutoCompleteProps,
  ISelectWithAutoCompleteState
> {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: props.value ? new Date(props.value) : new Date()
    };
  }

  handleDateChange = (date: Date) => {
    this.setState({ selectedOption: date });
  };

  getValue = () => this.state.selectedOption;
  render() {
    return (
      <DateInput
        formatDate={date => getDateFormatted(date)}
        parseDate={str => new Date(str)}
        value={this.state.selectedOption}
        onChange={this.handleDateChange}
        timePrecision={'second'}
        inputProps={{
          inputRef: node => setTimeout(() => node && node.focus(), 100)
        }}
      />
    );
  }
}

// import React, { PureComponent } from 'react';
// import { DateInput } from '@blueprintjs/datetime';
// import { getDateFormatted } from './utils/grid';
// import { InputGroup } from '@blueprintjs/core';
// import moment from 'moment';

// export interface ISelectWithAutoCompleteProps {
//   getSelectedOption: (selectedOption: string) => void;
//   value: string;
// }

// export interface ISelectWithAutoCompleteState {
//   selectedOption: string;
//   isValid: boolean;
// }

// export class AgGridDatePickerEditor extends PureComponent<
//   ISelectWithAutoCompleteProps,
//   ISelectWithAutoCompleteState
// > {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isValid: true,
//       selectedOption: props.value
//         ? moment(new Date(props.value)).format('DD MMM YYYY HH:mm:ss')
//         : ''
//     };
//   }

//   handleDateChange = ({ target: { value } }: any) => {
//     const isValid = moment(value).isValid();
//     this.setState({ selectedOption: value, isValid });
//   };

//   getValue = () => {
//     if (this.state.isValid) {
//       return this.state.selectedOption;
//     }
//   };
//   render() {
//     // {moment(this.state.selectedOption).format('DDMMMYY')}
//     const color = !this.state.isValid ? 'red' : 'black';
//     return (
//       <InputGroup
//         style={{ color }}
//         placeholder="DD MMM YYYY HH:mm:ss"
//         value={this.state.selectedOption}
//         onChange={this.handleDateChange}
//         inputRef={node => setTimeout(() => node && node.focus(), 100)}
//       />
//       // <DateInput
//       //   formatDate={date => getDateFormatted(date)}
//       //   parseDate={str => new Date(str)}
//       //   value={this.state.selectedOption}
//       //   onChange={this.handleDateChange}
//       //   timePrecision={'second'}
//       //   inputProps={{
//       //     inputRef: node => setTimeout(() => node && node.focus(), 100)
//       //   }}
//       // />
//     );
//   }
// }
