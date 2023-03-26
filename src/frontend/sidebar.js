import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './sidebar.css';

export default props => {
	return (
		<Menu>
			<a className="title" onClick={() => props.onFormSwitch('account')}>
				Account
				<p className="subtitle">アカウント</p>
			</a>
			<a className="title" onClick={() => props.onFormSwitch('entry')}>
				Entries
				<p className="subtitle">きにゅう</p>
			</a>
			<a className="title" onClick={() => props.onFormSwitch('exercise')}>
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