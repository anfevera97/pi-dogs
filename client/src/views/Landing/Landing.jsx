import React from 'react';
import landingImg from '../../img/Landing.jfif';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Landing = () => {
	return (
		<div>
			<img src={landingImg} alt='' />
			<Link to='/home'>
				<button>Come on in!</button>
			</Link>
		</div>
	);
};

export default Landing;
