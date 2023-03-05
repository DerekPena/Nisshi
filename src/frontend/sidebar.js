import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './sidebar.css';

export default props => {
  return (
    <Menu>
      <a className="title" onClick={() => props.onFormSwitch('userHome')}> 
        Home
        <p className="subtitle">ホメパゲ</p>
      </a>
      <a className="title" onClick={() => props.onFormSwitch('login')}>
        Login
        <p className="subtitle">ログイン</p>
      </a>
      <a className="title">
        Entries
        <p className="subtitle">きにゅう</p>
      </a>
      <a className="title">
        Exercises
        <p className="subtitle">れんしゅう</p>
      </a>
      <a className="title">
        Journal
        <p className="subtitle">にっし</p>
      </a>
    </Menu>
  );
};