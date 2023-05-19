import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, onSearch, clearSearch } from '../../redux/actions';
import CardsContainter from '../../components/CardsContainer/CardsContainter';

const Home = ({ query }) => {
	const dispatch = useDispatch();
	const search = useSelector((state) => state.filteredDogs);
	const currentPage = useSelector((state) => state.startPage);
	const resultsXPage = useSelector((state) => state.resultsXPage);

	useEffect(() => {
		if (query) {
			dispatch(onSearch(query));
		} else {
			dispatch(getDogs());
		}
		return () => {
			dispatch(clearSearch());
		};
	}, [dispatch]);

	return (
		<div>
			<CardsContainter
				currentPage={currentPage}
				resultsXPage={resultsXPage}
				search={search}
			/>
		</div>
	);
};

export default Home;
