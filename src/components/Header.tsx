import React from 'react';
import moment from 'moment';
import {
  Navbar,
  NavbarGroup,
  Alignment,
  Button,
  InputGroup,
  Icon,
  Intent,
  Tooltip
} from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
// import { DirectCar } from './DirectCar';

import './Header.scss';

const Header = ({ setNewDate, save, load }) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    load();
  };

  React.useEffect(() => {
    setNewDate(selectedDate.toISOString());
  });

  return (
    <Navbar className="header">
      <NavbarGroup align={Alignment.RIGHT}>
        <Tooltip>
          <Icon
            icon="help"
            intent={Intent.PRIMARY}
            iconSize={Icon.SIZE_LARGE}
          />
          <span style={{ fontSize: 11 }}>
            <p>save ALT+S</p>
            <p>select first invalid prop ALT+V</p>
          </span>
        </Tooltip>

        <InputGroup leftIcon="user" placeholder="user..." />
        <DateInput
          formatDate={date => moment(date).format('DD MMM YYYY')}
          parseDate={str => new Date(str)}
          placeholder={'DD-MM-YYYY'}
          value={selectedDate}
          onChange={handleDateChange}
          closeOnSelection={true}
        />
        <Button
          className="bp3-minimal"
          icon="download"
          text="Load"
          onClick={load}
        />
        <Button icon="floppy-disk" text="Save" onClick={save} />
      </NavbarGroup>
    </Navbar>
  );
};

export default Header;
