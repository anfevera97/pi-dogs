import axios from 'axios';
const server = 'http://localhost:3001';

export const GET_DOGS = 'GET_DOGS';

export const getDogs = () => {
	return async function (dispatch) {
		try {
			const response = await axios.get(`${server}/dog`);
			dispatch({ type: GET_DOGS, payload: response.data });
		} catch (error) {
			alert(error.messge);
		}
	};
};

////////////////////////////////////////
export const GET_DOG = 'GET_DOG';
export const getDogById = (id) => {
	return async function (dispatch) {
		try {
			const response = await axios.get(`${server}/dog/${id}`);
			dispatch({ type: GET_DOG, payload: response.data[0] });
		} catch (error) {
			alert(error.message);
		}
	};
};

///////////////////////////
export const SET_PAGE = 'SET_PAGE';
export const setPage = (page) => {
	return {
		type: SET_PAGE,
		payload: page,
	};
};

/////////////////
export const CLEAR_DETAIL = 'CLEAR_DETAIL';
export const clearDetail = () => {
	return { type: CLEAR_DETAIL };
};

/////////////
export const SEARCH = 'SEARCH';
export const onSearch = (query) => {
	return async function (dispatch) {
		try {
			const response = await axios.get(`${server}/dog?name=${query}`);
			console.log(response);
			dispatch({
				type: SEARCH,
				payload: response.data,
			});
		} catch (error) {
			alert(error.message);
		}
	};
};

///////////////
export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const clearSearch = () => {
	return { type: CLEAR_SEARCH };
};

//////////////

export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const getTemperaments = () => {
	return async function (dispatch) {
		try {
			const response = await axios.get(`${server}/temperaments`);
			dispatch({ type: GET_TEMPERAMENTS, payload: response.data });
		} catch (error) {
			alert(error.message);
		}
	};
};
