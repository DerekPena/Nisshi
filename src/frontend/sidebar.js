import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './sidebar.css';

export default props => {
  return (
    <Menu>
      <a className="title" href="/"> 
        Home <br/>
            <p className="subtitle">ホメパゲ</p>
      </a>
      <a className="title" href="/login">
        Login <br/>
            <p className="subtitle">ログイン</p>
      </a>
      <a className="title" href="/entries">
        Entries <br/>
            <p className="subtitle">きにゅう</p>
      </a>
      <a className="title" href="/exercises">
        Exercises <br/>
            <p className="subtitle">れんしゅう</p>
      </a>
      <a className="title" href="/journal">
        Journal <br/>
            <p className="subtitle">にっし</p>
      </a>
    </Menu>
  );
};