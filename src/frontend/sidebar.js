import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './css/sidebar.css';

export default props=> {
	return (
		<Menu>
			<div className="title" onClick={() => props.onFormSwitch('account')}>
				Account
				<p className="subtitle">アカウント</p>
			</div>
			<div className="title" onClick={() => props.onFormSwitch('entry')}>
				Entries
				<p className="subtitle">きにゅう</p>
			</div>
			<div className="title" onClick={() => props.onFormSwitch('exercise')}>
				Exercises
				<p className="subtitle">れんしゅう</p>
			</div>
			<div className="title" onClick={() => props.onFormSwitch('userHome')}>
				Journal
				<p className="subtitle">にっし</p>
			</div>
		</Menu>
	);
};