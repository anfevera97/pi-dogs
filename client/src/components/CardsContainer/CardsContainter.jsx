import { useState } from 'react';
import Card from '../DogCard/Card';
import style from './CardsContainter.module.css';
import { useSelector } from 'react-redux';

const CardsContainter = ({ currentPage, resultsXPage }) => {
	const dogs = useSelector((state) => state.dogs);
	const search = useSelector((state) => state.filteredDogs);
	const [page, setPage] = useState(currentPage);

	const totalPages = Math.ceil(dogs.length / resultsXPage);
	const startIndex = (page - 1) * resultsXPage;
	const endIndex = startIndex + resultsXPage;
	const currentResults = dogs.slice(startIndex, endIndex);

	const handlePageChange = (newPage) => {
		setPage(newPage);
	};

	const sortAB = () => {
		const alphabetical = [...currentResults].sort((a, b) =>
			a.name.localeCompare(b.name),
		);

		return alphabetical;
	};

	const renderPageNumbers = () => {
		const pageNumbers = [];

		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(
				<span
					className={i === page ? style.activePage : style.pageNumber}
					onClick={() => handlePageChange(i)}
				>
					{i}
				</span>,
			);
		}

		return pageNumbers;
	};

	return (
		<div className={style.container}>
			<div className={style.pagContainter}>
				<button
					disabled={page === 1}
					onClick={() => handlePageChange(page - 1)}
				>
					Prev
				</button>
				<div className={style.pageNumbersContainer}>{renderPageNumbers()}</div>
				<button
					disabled={page === totalPages}
					onClick={() => handlePageChange(page + 1)}
				>
					Next
				</button>
				<div>
					<button onClick={sortAB}>Sort A to Z</button>
				</div>
			</div>
			{search.length
				? search.map((dog) => (
						<div className={style.cardscontainer}>
							<Card
								key={dog.id}
								id={dog.id}
								image={dog.image}
								name={dog.name}
								temperament={dog.temperament}
								weight={dog.weight}
							/>
						</div>
				  ))
				: currentResults.map((dog) => (
						<div className={style.cardscontainer}>
							<Card
								key={dog.id}
								id={dog.id}
								image={dog.image}
								name={dog.name}
								temperament={dog.temperament}
								weight={dog.weight}
							/>
						</div>
				  ))}
		</div>
	);
};

export default CardsContainter;
