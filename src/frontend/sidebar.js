import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './sidebar.css';

export default props => {
  return (
    <Menu>
      <a className="title" onClick={() => props.onFormSwitch('userHome')}> 
        Account
        <p className="subtitle">アカウント</p>
      </a>
      <a className="title" onClick={() => props.onFormSwitch('userHome')}>
        Entries
        <p className="subtitle">きにゅう</p>
      </a>
      <a className="title" onClick={() => props.onFormSwitch('userHome')}>
        Exercises
        <p className="subtitle">れんしゅう</p>
      </a>
      <a className="title" onClick={() => props.onFormSwitch('userHome')}>
        Journal
        <p className="subtitle">にっし</p>
      </a>
    </Menu>
  );
};