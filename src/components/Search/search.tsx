import React, { ChangeEvent } from 'react';
import { SearchProps } from '../../types';
import './search.css';
import useLocalStorage from '../../hooks/useLocalStorage.ts';

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [savedSearch, setSavedSearch] = useLocalStorage('savedSearch', '');

    const inputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSavedSearch(event.target.value);
    };

    const inputSearch = (): void => {
        onSearch(savedSearch.trim());
    };

    return (
        <div className="input">
            <input type="text" value={savedSearch} onChange={inputChange} />
            <button onClick={inputSearch}>Search</button>
        </div>
    );
};

export default Search;
