import React, { PureComponent, ChangeEvent } from 'react';

import './Grid.scss';
import {
  Popover,
  PopoverInteractionKind,
  Intent,
  Classes,
  Icon
} from '@blueprintjs/core';
import { ITrades } from '../../types';
import { GridApi } from 'ag-grid-community';

interface ITextWithValidationProps {
  value: string;
  data: ITrades;
  api: GridApi;
  rowIndex: number;
}
interface ITextWithValidationState {
  value: string;
}

export class TextWithValidation extends PureComponent<
  ITextWithValidationProps,
  ITextWithValidationState
> {
  constructor(props: ITextWithValidationProps) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  handleOnChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value });
  };

  getValue = () => {
    const { value } = this.state;
    return value;
  };

  Errors() {
    const { value, ...props } = this.state;
    const {
      data: { validationErrors }
    } = this.props;
    console.log('aaaaaa', validationErrors);

    return (
      <Popover
        target={this.target}
        popoverClassName={Classes.POPOVER_CONTENT_SIZING}
        interactionKind={PopoverInteractionKind.HOVER}
        {...props}
      >
        <Icon icon="error" intent={Intent.DANGER} />
        <>
          {validationErrors &&
            Object.keys(validationErrors).map(error => {
              console.log(validationErrors[error].message);
              return (
                <div
                  key={error}
                  style={{
                    fontSize: 10,
                    cursor: 'pointer',
                    color: 'grey',
                    textDecoration: 'underline'
                  }}
                  // onClick={() => this.handleOnClick(error.field)}
                >
                  {validationErrors[error].message}
                </div>
              );
            })}
        </>
      </Popover>
    );
  }
  // handleOnClick = (field: string) => {
  //   const { api, data } = this.props;
  //   const { rowIndex } = api.getRowNode(data.id);
  //   api.setFocusedCell(rowIndex, field, null);
  //   api.startEditingCell({ rowIndex, colKey: field });
  // };

  render() {
    const {
      data: { isNoValidated }
    } = this.props;

    return <div>{isNoValidated && this.Errors()}</div>;
  }
}
