import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getDogById, clearDetail } from '../../redux/actions';
import style from './Detail.module.css';

const Detail = () => {
	const dispatch = useDispatch();
	const dog = useSelector((state) => state.dogsDetail);
	const { id } = useParams();

	useEffect(() => {
		dispatch(getDogById(id));

		return () => {
			dispatch(clearDetail());
		};
	}, [id, dispatch]);

	return (
		<div className={style.container}>
			<h1>Name: </h1>
			<p>{dog?.name}</p>
			<img src={dog?.image} alt='img not Found' className={style.img} />
			<h3>Temperament:</h3>
			{Array.isArray(dog.temperaments) ? (
				<p>{dog.temperaments.join(', ')}</p>
			) : (
				<p>{dog.temperaments}</p>
			)}
			<h3>Weight:</h3>
			<p>{dog.weight} kg</p>
			<h3>Height:</h3>
			<p>{dog.height} cm</p>
			{isNaN(dog.id) ? (
				<div>
					<h3>Life Span:</h3>
					<p>{dog.lifeSpan} years</p>
				</div>
			) : (
				<div>
					<h3>Life Span:</h3>
					<p>{dog.lifeSpan}</p>
				</div>
			)}
		</div>
	);
};

export default Detail;
