import { useState } from 'react';
import Card from '../DogCard/Card';
import style from './CardsContainter.module.css';
import { useSelector } from 'react-redux';

const CardsContainter = ({ currentPage, resultsXPage }) => {
	const dogs = useSelector((state) => state.dogs);
	const [page, setPage] = useState(currentPage);

	const totalPages = Math.ceil(dogs.length / resultsXPage);
	const startIndex = (page - 1) * resultsXPage;
	const endIndex = startIndex + resultsXPage;
	const currentResults = dogs.slice(startIndex, endIndex);

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
				>
					{i}
				</span>,
			);
		}

		return pageNumbers;
	};

	return (
		<div className={style.container}>
			{currentResults.map((dog) => {
				return (
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
				);
			})}
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
			</div>
		</div>
	);
};

export default CardsContainter;
