import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './css/sidebar.css';

export default props=> {
	const user = sessionStorage.getItem("userType")
	
	return (
		<div>
			{(() => {
				if (user === "Teacher") {
					return (
						<Menu>
							<div className="title" onClick={() => props.onFormSwitch('account')}>
								Account
								<p className="subtitle">アカウント</p>
							</div>
							<div className="title" onClick={() => props.onFormSwitch('teacher')}>
								Students
								<p className="subtitle">きにゅう</p>
							</div>
							<div className="title" onClick={() => props.onFormSwitch('journal')}>
								Journal
								<p className="subtitle">にっし</p>
							</div>
						</Menu>
					)
				}

				else if (user === "Student") {
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
							<div className="title" onClick={() => props.onFormSwitch('journal')}>
								Journal
								<p className="subtitle">にっし</p>
							</div>
						</Menu>
					)
				}
			}) ()}
		</div>
	);
};