import { GET_DOGS, GET_DOG, SET_PAGE } from './actions';

const initialState = {
	dogs: [],
	dogsDetail: {},
	startPage: 1,
	resultsXPage: 8,
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

		default:
			return { ...state };
	}
};

export default rootReducer;
