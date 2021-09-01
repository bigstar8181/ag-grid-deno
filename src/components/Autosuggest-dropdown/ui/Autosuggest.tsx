import React, { useState, useEffect, ChangeEvent } from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { Popover, InputGroup, Position, Button } from '@blueprintjs/core';
import theme from './theme';

import './Autosuggest.scss';

export interface IAutosuggestionComponentProps {
  getSelectedOption: (selectedOption: string) => void;
  values: string[];
  charPress?: string;
  autoFocus?: boolean;
}

const fontWeight = {
  bold: 700,
  normal: 400
};

const popoverConfig = {
  isOpen: false,
  minimal: true,
  modifiers: {
    arrow: { enabled: true },
    flip: { enabled: true },
    keepTogether: { enabled: true },
    preventOverflow: { enabled: true }
  },
  usePortal: true
};

function getSuggestionValue(suggestion: string) {
  return suggestion;
}

function getSuggestions(suggestions, optionSuggested: string) {
  const inputValue = (optionSuggested && optionSuggested.trim()) || '';
  const inputLength = inputValue.length;

  return inputLength === 0
    ? suggestions
    : suggestions.filter(suggestion => {
        const keep = suggestion
          .toLowerCase()
          .includes(inputValue.toLowerCase());
        return keep;
      });
}

export function AutosuggestionComponent({
  autoFocus = true,
  getSelectedOption,
  values,
  charPress
}: IAutosuggestionComponentProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [stateSuggestions, setSuggestions] = useState<string[]>([]);
  const [stateSuggestionSelected, setState] = useState({
    popper: charPress || ''
  });

  function handleSuggestionsFetchRequested(options) {
    return function({ value }: any) {
      setSuggestions(
        getSuggestions(
          options.sort(function(a, b) {
            return (
              a.indexOf(value) - b.indexOf(value) ||
              (a.toLowerCase() < b.toLowerCase()
                ? -1
                : a.toLowerCase() > b.toLowerCase()
                ? 1
                : 0)
            );
          }),
          value
        )
      );
    };
  }

  function handleSuggestionsClearRequested() {
    setSuggestions([]);
  }

  const handleChange = (name: string) => (
    _event: ChangeEvent<{}>,
    { newValue }: Autosuggest.ChangeEvent
  ) => {
    setState({
      ...stateSuggestionSelected,
      [name]: newValue
    });
  };

  function renderInputComponent(inputProps: any) {
    const { inputRef = () => {}, ref, ...other } = inputProps;
    return (
      <>
        <InputGroup
          className="auto-suggest-input"
          style={{ position: 'absolute' }}
          placeholder={selectedOption}
        />
        <InputGroup
          rightElement={<Button minimal={true} rightIcon="caret-down" />}
          style={{ position: 'absolute', backgroundColor: 'red' }}
          inputRef={node => {
            ref(node);
            inputRef(node);
          }}
          {...other}
        />
      </>
    );
  }

  function renderSuggestion(
    suggestion: string,
    { query }: Autosuggest.RenderSuggestionParams
  ) {
    const matches = match(suggestion, query);
    const parts = parse(suggestion, matches);

    return (
      <div>
        {parts.map(part => (
          <span
            key={part.text}
            style={{
              fontWeight: part.highlight ? fontWeight.bold : fontWeight.normal
            }}
          >
            {part.text}
          </span>
        ))}
      </div>
    );
  }

  function renderContainer(options) {
    return (
      <Popover
        {...popoverConfig}
        isOpen={suggestionFiltered.length > 0}
        wrapperTagName="div"
        targetTagName="div"
        boundary="viewport"
        position={Position.BOTTOM}
        content={
          <div
            {...options.containerProps}
            style={{
              width: anchorEl ? anchorEl.clientWidth : undefined
            }}
          >
            {options.children}
          </div>
        }
      >
        <div style={{ width: anchorEl ? anchorEl.clientWidth : undefined }} />
      </Popover>
    );
  }

  const autosuggestProps = {
    renderInputComponent,
    getSuggestionValue,
    renderSuggestion,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested(values),
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    highlightFirstSuggestion: true,
    theme: theme
  };

  const suggestionFiltered = stateSuggestions.filter(suggestion =>
    suggestion
      .toLowerCase()
      .includes(stateSuggestionSelected.popper.toLowerCase())
  );

  const selectedOption =
    suggestionFiltered.length > 0
      ? suggestionFiltered[0]
      : stateSuggestionSelected.popper;

  const setAutoFocus = (node: HTMLInputElement | null) => {
    if (node) {
      setTimeout(() => {
        autoFocus ? node.focus() : node.blur();
      }, 0);
    }
  };

  useEffect(() => {
    !!selectedOption && getSelectedOption(selectedOption);
    return () => {
      getSelectedOption(selectedOption);
    };
  }, [selectedOption]);

  return (
    <Autosuggest
      {...autosuggestProps}
      inputProps={{
        id: 'react-autosuggest-popper',
        value:
          selectedOption.slice(0, stateSuggestionSelected.popper.length) || '',
        onChange: handleChange('popper'),
        onBlur: () => {
          setState({
            ...stateSuggestionSelected,
            popper: selectedOption
          });
        },
        inputRef: (node: HTMLInputElement | null) => {
          setAutoFocus(node);
          setAnchorEl(node);
        }
      }}
      renderSuggestionsContainer={renderContainer}
    />
  );
}
