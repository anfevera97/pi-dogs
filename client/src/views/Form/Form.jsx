import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments } from '../../redux/actions';

const Form = () => {
	const dispatch = useDispatch();
	const temperaments = useSelector((state) => state.temperaments);

	const [form, setForm] = useState({
		name: '',
		image: '',
		temperament: [],
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

	useEffect(() => {
		dispatch(getTemperaments());
	}, [dispatch]);

	const toggleCheckbox = (temperament) => {
		setForm((prevForm) => {
			const updatedTemperaments = [...prevForm.temperament];

			if (updatedTemperaments.includes(temperament)) {
				const index = updatedTemperaments.indexOf(temperament);
				updatedTemperaments.splice(index, 1);
			} else {
				updatedTemperaments.push(temperament);
			}

			return { ...prevForm, temperament: updatedTemperaments };
		});
	};

	const validateRequired = (property, value) => {
		if (!value) {
			setErrors({ ...errors, [property]: `${property} is required` });
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

	const validateMinMax = (minValue, maxValue, fieldName) => {
		if (minValue && maxValue && parseInt(minValue) >= parseInt(maxValue)) {
			setErrors({
				...errors,
				[fieldName]: 'Min value must be less than Max value',
			});
		} else {
			setErrors({ ...errors, [fieldName]: '' });
		}
	};

	const changeHandler = (event) => {
		const property = event.target.name;
		const value = event.target.value;

		if (property === 'temperament') {
			const isChecked = event.target.checked;
			const temperamentValue = event.target.value;

			if (isChecked) {
				setForm((prevForm) => ({
					...prevForm,
					temperament: [...prevForm.temperament, temperamentValue],
				}));
			} else {
				setForm((prevForm) => ({
					...prevForm,
					temperament: prevForm.temperament.filter(
						(temperament) => temperament !== temperamentValue,
					),
				}));
			}
		} else if (
			property === 'heightMin' ||
			property === 'heightMax' ||
			property === 'weightMin' ||
			property === 'weightMax' ||
			property === 'lifeSpanMin' ||
			property === 'lifeSpanMax'
		) {
			const field = property.substring(0, property.length - 3);
			const minValue = property.endsWith('Min') ? value : form[`${field}Min`];
			const maxValue = property.endsWith('Max') ? value : form[`${field}Max`];

			validateMinMax(minValue, maxValue, field);

			setForm((prevForm) => ({
				...prevForm,
				[`${field}Min`]: minValue,
				[`${field}Max`]: maxValue,
				[field]: minValue && maxValue ? `${minValue} - ${maxValue}` : '',
			}));
		} else {
			if (property === 'image') {
				validateImageURL(value);
			} else if (property === 'name' || property === 'temperament') {
				validateRequired(property, value);
			}
			setForm((prevForm) => ({ ...prevForm, [property]: value }));
		}
	};

	const submitHandler = async (event) => {
		const hasErrors = Object.values(errors).some((error) => error !== '');
		const isEmpty = Object.values(form).some((f) => f === '');

		if (hasErrors || isEmpty) {
			event.preventDefault();
			alert('Please fix errors before submitting.');
			return;
		}

		try {
			const response = await axios.post('http://localhost:3001/dog', form);
			alert(response.data);
		} catch (error) {
			console.log(error);
			alert(error.message);
		}
	};

	return (
		<div className={style.container}>
			<form className={style.form}>
				<div>
					<p htmlFor='name'>Name: </p>
					<input
						type='text'
						value={form.name}
						onChange={changeHandler}
						name='name'
					/>
					<span>{errors.name}</span>
				</div>

				<div>
					<p htmlFor='image'>Image: </p>
					<input
						type='text'
						value={form.image}
						onChange={changeHandler}
						name='image'
					/>
					<span>{errors.image}</span>
				</div>

				<div>
					<p htmlFor='height'>Height: </p>
					<label htmlFor='min'>min</label>
					<input
						type='number'
						value={form.heightMin}
						onChange={changeHandler}
						name='heightMin'
					/>
					<label htmlFor='max'>max</label>
					<input
						type='number'
						value={form.heightMax}
						onChange={changeHandler}
						name='heightMax'
					/>
					<span>{errors.height}</span>
				</div>

				<div>
					<p htmlFor='weight'>Weight: </p>
					<label htmlFor='min'>min</label>
					<input
						type='number'
						value={form.weightMin}
						onChange={changeHandler}
						name='weightMin'
					/>
					<label htmlFor='max'>max</label>
					<input
						type='number'
						value={form.weightMax}
						onChange={changeHandler}
						name='weightMax'
					/>
					<span>{errors.weight}</span>
				</div>

				<div>
					<p htmlFor='lifeSpan'>Life Span: </p>
					<label htmlFor='min'>min</label>
					<input
						type='number'
						value={form.lifeSpanMin}
						onChange={changeHandler}
						name='lifeSpanMin'
					/>
					<label htmlFor='max'>max</label>
					<input
						type='number'
						value={form.lifeSpanMax}
						onChange={changeHandler}
						name='lifeSpanMax'
					/>
					<span>{errors.lifeSpan}</span>
				</div>

				<div>
					<label htmlFor='temperament'>Temperament: </label>
					<div className={style.temperamentContainer}>
						{temperaments.map((temperament) => (
							<div key={temperament.id}>
								<input
									type='checkbox'
									name='temperament'
									value={temperament.name}
									checked={form.temperament.includes(temperament.name)}
									onChange={() => toggleCheckbox(temperament.name)}
								/>
								<label>{temperament.name}</label>
							</div>
						))}
					</div>
					<span>{errors.temperament}</span>
				</div>

				<button type='submit' onClick={submitHandler} className={style.boton}>
					Create Dog
				</button>
			</form>
		</div>
	);
};

export default Form;
