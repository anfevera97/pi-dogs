import React from 'react';
import style from './Card.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Card = (props) => {
	return (
		<div className={style.container}>
			<Link to={`/detail/${props.id}`}>
				<p>Name: {props.name}</p>
				<img src={props.image} alt={props.name} className={style.img} />
			</Link>
			<p>Temperament:</p>
			<p>{props.temperament}</p>
			<p>Weight: {props.weight}</p>
		</div>
	);
};

export default Card;
