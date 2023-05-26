import React from 'react';
import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
import SearchBar from '../SearchBar/SearchBar';

const NavBar = ({ value }) => {
	return (
		<div className={style.containter}>
			<SearchBar query={value} />
			<Link className={style.link} to='/home'>
				HOME
			</Link>
			<Link className={style.link} to='/create'>
				FORM
			</Link>
		</div>
	);
};

export default NavBar;
