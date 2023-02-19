import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './sidebar.css';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/login">
        Login
      </a>
      <a className="menu-item" href="/entries">
        Entries
      </a>
      <a className="menu-item" href="/exercises">
        Exercises
      </a>
      <a className="menu-item" href="/journal">
        Journal
      </a>
    </Menu>
  );
};