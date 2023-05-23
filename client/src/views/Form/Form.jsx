// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import style from './Form.module.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { getTemperaments } from '../../redux/actions';

// const Form = () => {
// 	const dispatch = useDispatch();
// 	const [form, setForm] = useState({
// 		name: '',
// 		image: '',
// 		temperament: [],
// 		height: '',
// 		weight: '',
// 		lifeSpan: '',
// 	});

// 	const [errors, setErrors] = useState({
// 		name: '',
// 		image: '',
// 		temperament: '',
// 		height: '',
// 		weight: '',
// 		lifeSpan: '',
// 	});

// 	const temperaments = useSelector((state) => state.temperaments);

// 	useEffect(() => {
// 		dispatch(getTemperaments());
// 	}, [dispatch]);
// 	useEffect(() => {
// 		setForm((prevForm) => ({
// 			...prevForm,
// 			temperament: temperaments.map((t) => t.name),
// 		}));
// 	}, [temperaments]);

// 	const toggleCheckbox = (temperament) => {
// 		setForm((prevForm) => {
// 			const updatedTemperaments = [...prevForm.temperament];

// 			if (updatedTemperaments.includes(temperament)) {
// 				// Remove temperament if already selected
// 				const index = updatedTemperaments.indexOf(temperament);
// 				updatedTemperaments.splice(index, 1);
// 			} else {
// 				// Add temperament if not selected
// 				updatedTemperaments.push(temperament);
// 			}

// 			return { ...prevForm, temperament: updatedTemperaments };
// 		});
// 	};

// 	console.log(form.temperament);

// 	const changeHandler = (event) => {
// 		const property = event.target.name;
// 		const value = event.target.value;

// 		if (property === 'temperament') {
// 			const isChecked = event.target.checked;
// 			const temperamentValue = event.target.value;

// 			if (isChecked) {
// 				setForm((prevForm) => ({
// 					...prevForm,
// 					temperament: [...prevForm.temperament, temperamentValue],
// 				}));
// 			} else {
// 				setForm((prevForm) => ({
// 					...prevForm,
// 					temperament: prevForm.temperament.filter(
// 						(temperament) => temperament !== temperamentValue,
// 					),
// 				}));
// 			}
// 		} else {
// 			if (property === 'image') {
// 				validateImageURL(value);
// 			} else if (property === 'name' || property === 'temperament') {
// 				validateRequired(property, value);
// 			}
// 			setForm((prevForm) => ({ ...prevForm, [property]: value }));
// 		}
// 	};
// 	const validateRequired = (property, value) => {
// 		if (!value) {
// 			setErrors({ ...errors, [property]: `${property} is required` });
// 		} else {
// 			setErrors({ ...errors, [property]: '' });
// 		}
// 	};

// 	const validateImageURL = (value) => {
// 		const URLRegex =
// 			'^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$';
// 		if (!value) {
// 			setErrors({ ...errors, image: 'Must provide image URL' });
// 		} else if (!new RegExp(URLRegex).test(value)) {
// 			setErrors({ ...errors, image: 'Image must be a valid URL' });
// 		} else {
// 			setErrors({ ...errors, image: '' });
// 		}
// 	};

// 	const validateNumericField = (value, fieldName) => {
// 		if (!value || isNaN(value)) {
// 			setErrors({ ...errors, [fieldName]: 'Must provide a valid number' });
// 		} else {
// 			setErrors({ ...errors, [fieldName]: '' });
// 		}
// 	};

// 	const submitHandler = async (event) => {
// 		event.preventDefault();

// 		try {
// 			const response = await axios.post('http://localhost:3001/dog', form);
// 			alert(response.data);
// 		} catch (error) {
// 			alert(error);
// 		}
// 	};

// 	return (
// 		<div className={style.container}>
// 			<form className={style.form}>
// 				<div>
// 					<label htmlFor='name'>Name: </label>
// 					<input
// 						type='text'
// 						value={form.name}
// 						onChange={changeHandler}
// 						name='name'
// 					/>
// 					<span>{errors.name}</span>
// 				</div>

// 				<div>
// 					<label htmlFor='image'>Image: </label>
// 					<input
// 						type='text'
// 						value={form.image}
// 						onChange={changeHandler}
// 						name='image'
// 					/>
// 					<span>{errors.image}</span>
// 				</div>

// 				<div>
// 					<label htmlFor='temperament'>Temperament: </label>
// 					<div className={style.temperamentContainer}>
// 						{temperaments.map((temperament) => (
// 							<div key={temperament.id}>
// 								<input
// 									type='checkbox'
// 									name='temperament'
// 									value={temperament.name}
// 									checked={form.temperament.includes(temperament.name)}
// 									onChange={() => toggleCheckbox(temperament.name)}
// 								/>
// 								<label>{temperament.name}</label>
// 							</div>
// 						))}
// 					</div>
// 					<span>{errors.temperament}</span>
// 				</div>

// 				<div>
// 					<label htmlFor='height'>Height: </label>
// 					<input
// 						type='number'
// 						value={form.height}
// 						onChange={(event) => {
// 							changeHandler(event);
// 							validateNumericField(event.target.value, 'height');
// 						}}
// 						name='height'
// 					/>
// 					<span>{errors.height}</span>
// 				</div>

// 				<div>
// 					<label htmlFor='weight'>Weight: </label>
// 					<input
// 						type='number'
// 						value={form.weight}
// 						onChange={(event) => {
// 							changeHandler(event);
// 							validateNumericField(event.target.value, 'weight');
// 						}}
// 						name='weight'
// 					/>
// 					<span>{errors.weight}</span>
// 				</div>

// 				<div>
// 					<label htmlFor='lifeSpan'>Life Span: </label>
// 					<input
// 						type='number'
// 						value={form.lifeSpan}
// 						onChange={(event) => {
// 							changeHandler(event);
// 							validateNumericField(event.target.value, 'lifeSpan');
// 						}}
// 						name='lifeSpan'
// 					/>
// 					<span>{errors.lifeSpan}</span>
// 				</div>

// 				<button type='submit' onClick={submitHandler}>
// 					SUBMIT
// 				</button>
// 			</form>
// 		</div>
// 	);
// };

// export default Form;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments } from '../../redux/actions';

const Form = () => {
	const dispatch = useDispatch();
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

	const temperaments = useSelector((state) => state.temperaments);

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

	console.log(form.temperament);

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
		} else {
			if (property === 'image') {
				validateImageURL(value);
			} else if (property === 'name' || property === 'temperament') {
				validateRequired(property, value);
			}
			setForm((prevForm) => ({ ...prevForm, [property]: value }));
		}
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

	const validateNumericField = (value, fieldName) => {
		if (!value || isNaN(value)) {
			setErrors({ ...errors, [fieldName]: 'Must provide a valid number' });
		} else {
			setErrors({ ...errors, [fieldName]: '' });
		}
	};

	const submitHandler = async (event) => {
		event.preventDefault();

		try {
			const response = await axios.post('http://localhost:3001/dog', form);
			alert(response.data);
		} catch (error) {
			alert(error);
		}
	};

	// useEffect(() => {
	// 	setForm((prevForm) => ({
	// 		...prevForm,
	// 		temperament: temperaments.map((t) => t.name),
	// 	}));
	// }, [temperaments]);

	useEffect(() => {
		setForm((prevForm) => ({
			...prevForm,
			temperament: [],
		}));
	}, [temperaments]);

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
