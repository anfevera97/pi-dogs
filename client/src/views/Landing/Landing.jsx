import React from 'react';
import landingImg from '../../img/Landing.jfif';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import style from './Landing.module.css';

const Landing = () => {
	return (
		<div className={style.container}>
			<img src={landingImg} alt='No image found' className={style.img} />
			<h2 className={style.title}>Do you like cute dogs?</h2>
			<Link to='/home'>
				<button className={style.button}>Come on in!</button>
			</Link>
		</div>
	);
};

export default Landing;
