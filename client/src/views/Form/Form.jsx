import { useState } from 'react';
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
		validate({ ...form, [property]: value });
		setForm({ ...form, [property]: value });
	};

	const validate = (form) => {
		//Name cant have numbers
		if (!form.name) setErrors({ ...errors, name: 'Must have name' });
		if (/^[^0-9]*$/.test(form.name)) {
			setErrors({ ...errors, name: '' });
		} else {
			setErrors({ ...errors, name: "Name can't contain numbers" });
		}

		//Temperaments can't have numbers
		if (/^[^0-9]*$/.test(form.temperament)) {
			setErrors({ ...errors, temperament: '' });
		} else {
			setErrors({
				...errors,
				temperament: "Temperaments can't contain numbers",
			});
		}
		if (!form.temperament)
			setErrors({ ...errors, temperament: 'Must provide temperaments' });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		const response = axios
			.post('http://localhost:3001/dog', form)
			.then((res) => alert(res))
			.catch((err) => alert(err));
		return response;
	};

	return (
		<div className={style.container}>
			<form className={style.form}>
				<div>
					<label htmlFor=''>Name: </label>
					<input
						type='text'
						value={form.name}
						onChange={changeHandler}
						name='name'
					/>
					<span>{errors.name}</span>
				</div>

				<div>
					<label htmlFor=''>Image: </label>
					<input
						type='text'
						value={form.image}
						onChange={changeHandler}
						name='image'
					/>
				</div>

				<div>
					<label htmlFor=''>Temperament: </label>
					<input
						type='text'
						value={form.temperament}
						onChange={changeHandler}
						name='temperament'
					/>
					<span>{errors.temperament}</span>
				</div>

				<div>
					<label htmlFor=''>Height: </label>
					<input
						type='text'
						value={form.height}
						onChange={changeHandler}
						name='height'
					/>
				</div>

				<div>
					<label htmlFor=''>Weight: </label>
					<input
						type='text'
						value={form.weight}
						onChange={changeHandler}
						name='weight'
					/>
				</div>

				<div>
					<label htmlFor=''>Life Span: </label>
					<input type='text' value={form.lifeSpan} name='lifeSpan' />
				</div>

				<button type='submit' onClick={submitHandler}>
					SUBMIT
				</button>
			</form>
		</div>
	);
};

export default Form;
