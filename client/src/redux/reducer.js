import {
	GET_DOGS,
	GET_DOG,
	SET_PAGE,
	CLEAR_DETAIL,
	SEARCH,
	CLEAR_SEARCH,
	GET_TEMPERAMENTS,
} from './actions';

const initialState = {
	dogs: [],
	dogsDetail: [],
	startPage: 1,
	resultsXPage: 8,
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

		case GET_TEMPERAMENTS:
			return {
				...state,
				temperaments: action.payload,
			};
		default:
			return { ...state };
	}
};

export default rootReducer;
