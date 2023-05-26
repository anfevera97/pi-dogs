import React from 'react';
import style from './Card.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Card = (props) => {
	console.log(props);
	return (
		<div className={style.container}>
			<Link to={`/detail/${props.id}`} className={style.link}>
				<p>Name: {props.name}</p>
				<img src={props.image} alt={props.name} className={style.img} />
			</Link>
			<p>Temperament:</p>
			{Array.isArray(props.temperaments) ? (
				<p>{props.temperaments.join(', ')}</p>
			) : (
				<p>{props.temperaments}</p>
			)}
			<p>Weight: {props.weight}</p>
		</div>
	);
};

export default Card;
