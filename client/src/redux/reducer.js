import {
	GET_DOGS,
	GET_DOG,
	SET_PAGE,
	CLEAR_DETAIL,
	SEARCH,
	CLEAR_SEARCH,
} from './actions';

const initialState = {
	dogs: [],
	dogsDetail: [],
	startPage: 1,
	resultsXPage: 8,
	filteredDogs: [],
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

		case SET_PAGE:
			return {
				...state,
				startPage: action.payload,
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
		default:
			return { ...state };
	}
};

export default rootReducer;
