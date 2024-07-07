import React from 'react';
import Search from './components/Search/search.tsx';
import Results from './components/Results/results.tsx';
import ErrorBoundary from './components/ErrorBoundary/errorBoundary.tsx';
import { AppState, Result, SearchState } from './types';
import { getStarships } from './services/apiService.tsx';
import './App.css';

class App extends React.Component<SearchState, AppState> {
  constructor(props: SearchState) {
    super(props);
    this.state = {
      savedSearch: '',
      results: [],
      error: null,
    };
  }

  componentDidMount(): void {
    const savedSearch: string = localStorage.getItem('savedSearch') || '';
    this.setState({ savedSearch: savedSearch }, this.fetchResults);
  }

  fetchResults = async (): Promise<void> => {
    const cleanedSavedSearch: string = this.state.savedSearch.trim();
    const query: string = cleanedSavedSearch ? `search=${cleanedSavedSearch}` : '';

    try {
      const starships: Result[] = await getStarships(query);
      this.setState({ results: starships });
    } catch (error) {
      this.setState({ error: error as Error });
    }
  };

  handleSearch = (newSavedSearch: string): void => {
    localStorage.setItem('savedSearch', newSavedSearch);
    this.setState({ savedSearch: newSavedSearch }, this.fetchResults);
  };

  handleError = (): void => {
    this.setState({ error: new Error('Test Error') });
  };

  resetError = (): void => {
    this.setState({ error: null });
  };

  render() {
    const { results, error } = this.state;

    if (error) {
      return (
        <ErrorBoundary>
          <div className="error-container">
            <div className="error-message">Error: {error.message}</div>
            <button onClick={this.resetError}>GetBack</button>
          </div>
        </ErrorBoundary>
      );
    }
    return (
      <ErrorBoundary>
        <div className="container">
          <div className="search-container">
            <div className="search">
              <Search onSearch={this.handleSearch} />
            </div>
            <button className="error-button" onClick={this.handleError}>
              Throw Error
            </button>
          </div>
          <div className="results" style={{ height: '80%' }}>
            <Results results={results} />
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
