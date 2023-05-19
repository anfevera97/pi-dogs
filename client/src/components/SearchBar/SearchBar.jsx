// import React, { useState } from 'react';
// import { onSearch } from '../../redux/actions';
// import { useDispatch, useSelector } from 'react-redux';

// const SearchBar = () => {
//     const [query, setQuery] = useState('');
// 	const filter = useSelector((state) => state.filteredDogs);
// 	const dispatch = useDispatch();

// 	const handleChange = (event) => {
// 		setQuery(event.target.value);
// 	};

// 	return (
// 		<div>
// 			<input
// 				type='text'
// 				placeholder='Search Dog Breed'
// 				value={query}
// 				onChange={handleChange}
// 				onKeyDown={(event) =>
// 					event.key === 'Enter' && dispatch(onSearch(query))
// 				}
// 			/>
// 			<button onClick={() => dispatch(onSearch(query))}>Search</button>
// 		</div>
// 	);
// };

// export default SearchBar;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { onSearch } from '../../redux/actions';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const SearchBar = () => {
	const [query, setQuery] = useState('');
	const dispatch = useDispatch();
	const location = useLocation();

	const handleChange = (event) => {
		setQuery(event.target.value);
	};

	const handleSearch = () => {
		dispatch(onSearch(query));
	};

	if (location.pathname !== '/home') return null;

	return (
		<div>
			<input
				type='text'
				placeholder='Search Dog Breed'
				value={query}
				onChange={handleChange}
				onKeyDown={(event) => event.key === 'Enter' && handleSearch(query)}
			/>
			<button onClick={handleSearch}>Search</button>
		</div>
	);
};

export default SearchBar;
