import { useState } from 'react';
import Card from '../DogCard/Card';
import style from './CardsContainter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	orderByName,
	getFilterByTemper,
	filterSource,
	weightFilter,
} from '../../redux/actions';

const CardsContainter = () => {
	const dispatch = useDispatch();
	const dogs = useSelector((state) => state.dogs);
	const search = useSelector((state) => state.filteredDogs);
	const temperaments = useSelector((state) => state.temperaments);
	const [page, setPage] = useState(1);
	const resultsXPage = 8;

	const totalPages = Math.ceil(
		(search.length ? search : dogs).length / resultsXPage,
	);
	const startIndex = (page - 1) * resultsXPage;
	const endIndex = startIndex + resultsXPage;
	const currentResults = (search.length ? search : dogs).slice(
		startIndex,
		endIndex,
	);

	const handlePageChange = (newPage) => {
		setPage(newPage);
	};

	const renderPageNumbers = () => {
		const pageNumbers = [];

		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(
				<span
					className={i === page ? style.activePage : style.pageNumber}
					onClick={() => handlePageChange(i)}
					key={i}
				>
					{i}
				</span>,
			);
		}

		return pageNumbers;
	};

	const handleOrderByName = (e) => {
		dispatch(orderByName(e.target.value));
	};

	const handleFilterByTemperament = (e) => {
		dispatch(getFilterByTemper(e.target.value));
		setPage(1);
	};

	const handleFilterBddOrApi = (e) => {
		dispatch(filterSource(e.target.value));
		setPage(1);
	};

	const handleFilterWeight = (e) => {
		dispatch(weightFilter(e.target.value));
		setPage(1);
	};

	const handleReset = () => {
		setPage(1);
		window.location.reload();
	};

	return (
		<div>
			<div className={style.container}>
				{currentResults.map((dog) => (
					<div className={style.cardscontainer} key={dog.id}>
						<Card
							id={dog.id}
							image={dog.image}
							name={dog.name}
							temperaments={dog.temperaments}
							weight={dog.weight}
						/>
					</div>
				))}
			</div>
			<div className={style.filters}>
				<div className={style.pagContainter}>
					<button
						disabled={page === 1}
						onClick={() => handlePageChange(page - 1)}
					>
						Prev
					</button>
					<div className={style.pageNumbersContainer}>
						{renderPageNumbers()}
					</div>
					<button
						disabled={page === totalPages}
						onClick={() => handlePageChange(page + 1)}
					>
						Next
					</button>
				</div>
				<div>
					<div>
						<select onChange={handleOrderByName}>
							<option disabled defaultValue>
								Alphabetical order
							</option>
							<option value='A-Z'>A-Z</option>
							<option value='Z-A'>Z-A</option>
						</select>
					</div>
					<div>
						<select onChange={handleFilterWeight}>
							<option disabled defaultValue>
								weight
							</option>
							<option value='MinToMax'>lighter first</option>
							<option value='MaxToMin'>heavier first</option>
						</select>
					</div>

					<select
						onChange={handleFilterByTemperament}
						className={style.temperaments}
					>
						<option disabled defaultValue>
							Temperaments
						</option>
						<option value='all'>All</option>
						{temperaments?.map((temp) => (
							<option value={temp.name} key={temp.id}>
								{temp.name}
							</option>
						))}
					</select>
					<select onChange={handleFilterBddOrApi}>
						<option value='all'>ALL</option>
						<option value='API'>API dogs</option>
						<option value='BDD'>BDD dogs</option>
					</select>
					<button onClick={handleReset}>Reset Filters</button>
				</div>
			</div>
		</div>
	);
};

export default CardsContainter;
