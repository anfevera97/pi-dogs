import {
	GET_DOGS,
	GET_DOG,
	CLEAR_DETAIL,
	SEARCH,
	CLEAR_SEARCH,
	GET_TEMPERAMENTS,
	ORDER_BY_NAME,
	FILTER_TEMPERAMENTS,
	FILRTER_BY_SOURCE,
	WEIGHT_FILTER,
} from './actions';

const initialState = {
	dogs: [],
	dogsDetail: {},
	filteredDogs: [],
	temperaments: [],
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_DOGS:
			return {
				...state,
				dogs: action.payload,
			};

		case GET_DOG:
			return {
				...state,
				dogsDetail: action.payload,
			};

		case CLEAR_DETAIL:
			return {
				...state,
				dogsDetail: {},
			};

		case SEARCH:
			return {
				...state,
				filteredDogs: action.payload,
			};

		case CLEAR_SEARCH:
			return {
				...state,
				filteredDogs: [],
			};

		case GET_TEMPERAMENTS:
			return {
				...state,
				temperaments: action.payload,
			};

		case ORDER_BY_NAME:
			const sortedName = [...state.dogs].sort((a, b) => {
				return action.payload === 'A-Z'
					? a.name.localeCompare(b.name)
					: b.name.localeCompare(a.name);
			});
			return {
				...state,
				filteredDogs: sortedName,
			};

		case FILTER_TEMPERAMENTS:
			const filteredDogs =
				action.payload === 'all'
					? state.dogs
					: state.dogs.filter(
							(dog) =>
								dog.temperaments &&
								action.payload &&
								dog.temperaments.includes(action.payload),
					  );
			return {
				...state,
				filteredDogs: filteredDogs,
			};

		case FILRTER_BY_SOURCE:
			return {
				...state,
				filteredDogs:
					action.payload === 'all'
						? state.dogs
						: state.dogs.filter((dog) =>
								action.payload === 'API' ? !dog.created : dog.created,
						  ),
			};

		case WEIGHT_FILTER:
			const filterweight = [...state.dogs];

			const filter = filterweight.filter((dog) => {
				if (dog.weight) {
					const dogWeight = dog.weight.split('-').map(Number);
					const dogAverage = (dogWeight[0] + dogWeight[1]) / 2;
					return dogAverage;
				}
				return false;
			});

			if (action.payload === 'MinToMax') {
				filter.sort((a, b) => {
					const aAverage =
						(a.weight.split('-').map(Number)[0] +
							a.weight.split('-').map(Number)[1]) /
						2;
					const bAverage =
						(b.weight.split('-').map(Number)[0] +
							b.weight.split('-').map(Number)[1]) /
						2;
					return aAverage - bAverage;
				});
			} else {
				filter.sort((a, b) => {
					const aAverage =
						(a.weight.split('-').map(Number)[0] +
							a.weight.split('-').map(Number)[1]) /
						2;
					const bAverage =
						(b.weight.split('-').map(Number)[0] +
							b.weight.split('-').map(Number)[1]) /
						2;
					return bAverage - aAverage;
				});
			}

			return {
				...state,
				filteredDogs: filter,
			};

		default:
			return { ...state };
	}
};

export default rootReducer;
