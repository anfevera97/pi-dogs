import React from 'react';
import style from './Card.module.css';

const Card = (props) => {
	return (
		<div className={style.container}>
			<p>Name: {props.name}</p>
			<img src={props.image} alt={props.name} className={style.img} />
			<p>Temperament:</p>
			<p>{props.temperament}</p>
			<p>Weight: {props.weight}</p>
		</div>
	);
};

export default Card;
