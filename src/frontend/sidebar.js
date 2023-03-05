import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './sidebar.css';

export default props => {
  return (
    <Menu>
      <a className="title" onClick={() => props.onFormSwitch('home')}> 
        Home
        <p className="subtitle">ホメパゲ</p>
      </a>
      <a className="title" onClick={() => props.onFormSwitch('login')}>
        Login
        <p className="subtitle">ログイン</p>
      </a>
      <a className="title" href="/entries">
        Entries
        <p className="subtitle">きにゅう</p>
      </a>
      <a className="title" href="/exercises">
        Exercises
        <p className="subtitle">れんしゅう</p>
      </a>
      <a className="title" href="/journal">
        Journal
        <p className="subtitle">にっし</p>
      </a>
    </Menu>
  );
};