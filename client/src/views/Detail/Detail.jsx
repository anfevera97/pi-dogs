import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getDogById, clearDetail } from '../../redux/actions';
import style from './Detail.module.css';

const Detail = () => {
	const dispatch = useDispatch();
	const dog = useSelector((state) => state.dogsDetail);
	const { id } = useParams();
	console.log(dog);

	useEffect(() => {
		dispatch(getDogById(id));

		return () => {
			dispatch(clearDetail());
		};
	}, [id, dispatch]);

	return (
		<div className={style.container}>
			<p>Name: {dog?.name}</p>
			<img src={dog?.image} alt='img not Found' className={style.img} />
			<p>Temperament:</p>
			{Array.isArray(dog.temperaments) ? (
				<p>{dog.temperaments.join(', ')}</p>
			) : (
				<p>{dog.temperaments}</p>
			)}
			<p>Weight: {dog.weight} kg</p>
			<p>Height: {dog.height} cm</p>
			{isNaN(dog.id) ? (
				<p>Life Span: {dog.lifeSpan} years </p>
			) : (
				<p>Life Span: {dog.lifeSpan}</p>
			)}
		</div>
	);
};

export default Detail;
