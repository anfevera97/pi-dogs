import React, { useState } from 'react';
import axios from 'axios';
import style from './Form.module.css';

const Form = () => {
	const [form, setForm] = useState({
		name: '',
		image: '',
		temperament: '',
		height: '',
		weight: '',
		lifeSpan: '',
	});

	const [errors, setErrors] = useState({
		name: '',
		image: '',
		temperament: '',
		height: '',
		weight: '',
		lifeSpan: '',
	});

	const changeHandler = (event) => {
		const property = event.target.name;
		const value = event.target.value;
		if (property === 'image') {
			validateImageURL(value);
		} else if (property === 'name' || property === 'temperament') {
			validateRequired(property, value);
		}
		setForm({ ...form, [property]: value });
	};

	const validateRequired = (property, value) => {
		if (!value) {
			setErrors({ ...errors, [property]: 'This field is required' });
		} else {
			setErrors({ ...errors, [property]: '' });
		}
	};

	const validateImageURL = (value) => {
		const URLRegex =
			'^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$';
		if (!value) {
			setErrors({ ...errors, image: 'Must provide image URL' });
		} else if (!new RegExp(URLRegex).test(value)) {
			setErrors({ ...errors, image: 'Image must be a valid URL' });
		} else {
			setErrors({ ...errors, image: '' });
		}
	};

	const validateNumericField = (value, fieldName) => {
		if (!value || isNaN(value)) {
			setErrors({ ...errors, [fieldName]: 'Must provide a valid number' });
		} else {
			setErrors({ ...errors, [fieldName]: '' });
		}
	};

	const submitHandler = (event) => {
		event.preventDefault();
		const response = axios
			.post('http://localhost:3001/dog', form)
			.then((res) => alert(res.data))
			.catch((err) => alert(err));
		return response;
	};

	return (
		<div className={style.container}>
			<form className={style.form}>
				<div>
					<label htmlFor='name'>Name: </label>
					<input
						type='text'
						value={form.name}
						onChange={changeHandler}
						name='name'
					/>
					<span>{errors.name}</span>
				</div>

				<div>
					<label htmlFor='image'>Image: </label>
					<input
						type='text'
						value={form.image}
						onChange={changeHandler}
						name='image'
					/>
					<span>{errors.image}</span>
				</div>

				<div>
					<label htmlFor='temperament'>Temperament: </label>
					<input
						type='text'
						value={form.temperament}
						onChange={changeHandler}
						name='temperament'
					/>
					<span>{errors.temperament}</span>
				</div>

				<div>
					<label htmlFor='height'>Height: </label>
					<input
						type='number'
						value={form.height}
						onChange={(event) => {
							changeHandler(event);
							validateNumericField(event.target.value, 'height');
						}}
						name='height'
					/>
					<span>{errors.height}</span>
				</div>

				<div>
					<label htmlFor='weight'>Weight: </label>
					<input
						type='number'
						value={form.weight}
						onChange={(event) => {
							changeHandler(event);
							validateNumericField(event.target.value, 'weight');
						}}
						name='weight'
					/>
					<span>{errors.weight}</span>
				</div>

				<div>
					<label htmlFor='lifeSpan'>Life Span: </label>
					<input
						type='number'
						value={form.lifeSpan}
						onChange={(event) => {
							changeHandler(event);
							validateNumericField(event.target.value, 'lifeSpan');
						}}
						name='lifeSpan'
					/>
					<span>{errors.lifeSpan}</span>
				</div>

				<button type='submit' onClick={submitHandler}>
					SUBMIT
				</button>
			</form>
		</div>
	);
};

export default Form;
