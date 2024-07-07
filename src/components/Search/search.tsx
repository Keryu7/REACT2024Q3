import React from 'react';
import { SearchProps, SearchState } from '../../types';
import './search.css';

class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      savedSearch: localStorage.getItem('savedSearch') || '',
    };
  }

  inputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ savedSearch: event.target.value });
  };

  inputSearch = (): void => {
    const savedSearch: string = this.state.savedSearch;
    this.props.onSearch(savedSearch.trim());
  };

  render() {
    const savedSearch: string = this.state.savedSearch;
    return (
      <div className="input">
        <input type="text" value={savedSearch} onChange={this.inputChange} />
        <button onClick={this.inputSearch}>Search</button>
      </div>
    );
  }
}

export default Search;
