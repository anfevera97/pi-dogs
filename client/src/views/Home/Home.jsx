import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	getDogs,
	onSearch,
	clearSearch,
	getTemperaments,
} from '../../redux/actions';
import CardsContainter from '../../components/CardsContainer/CardsContainter';

const Home = ({ query }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (query) {
			dispatch(onSearch(query));
		} else {
			dispatch(getDogs()) && dispatch(getTemperaments());
		}
		return () => {
			dispatch(clearSearch());
		};
	}, [dispatch, query]);

	return (
		<div>
			<CardsContainter />
		</div>
	);
};

export default Home;
