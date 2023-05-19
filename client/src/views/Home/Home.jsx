import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from '../../redux/actions';
import CardsContainter from '../../components/CardsContainer/CardsContainter';

const Home = () => {
	const dispatch = useDispatch();
	const currentPage = useSelector((state) => state.startPage);
	const resultsXPage = useSelector((state) => state.resultsXPage);

	useEffect(() => {
		dispatch(getDogs(currentPage, resultsXPage));
	}, [dispatch, currentPage, resultsXPage]);

	return (
		<div>
			<CardsContainter currentPage={currentPage} resultsXPage={resultsXPage} />
		</div>
	);
};

export default Home;
