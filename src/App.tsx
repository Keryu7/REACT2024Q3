/*import React from 'react';
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
    const query: string = cleanedSavedSearch ? cleanedSavedSearch : '';

    try {
      console.log('VALUE', )
      const starships: Result[] = await getStarships(query);
      console.log('VALUE_2', )
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
              <Search onSearch={this.handleSearch}/>
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

export default App;*/

import React, { useState, useEffect } from 'react';
import Search from './components/Search/search.tsx';
import Results from './components/Results/results.tsx';
import ErrorBoundary from './components/ErrorBoundary/errorBoundary.tsx';
import { Result } from './types';
import { getStarships } from './services/apiService.tsx';
import './App.css';

const App: React.FC = () => {
  const [savedSearch, setSavedSearch] = useState<string>(localStorage.getItem('savedSearch') || '');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect((): void => {
    fetchResults();
  }, [savedSearch]);

  const fetchResults = async (): Promise<void> => {
    const cleanedSavedSearch: string = savedSearch.trim();
    const query: string = cleanedSavedSearch ? cleanedSavedSearch : '';

    try {
      setLoading(true);
      const starships: Result[] = await getStarships(query);
      setResults(starships);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newSavedSearch: string): void => {
    localStorage.setItem('savedSearch', newSavedSearch);
    setSavedSearch(newSavedSearch);
  };

  const handleError = (): void => {
    setError(new Error('Test Error'));
  };

  const resetError = (): void => {
    setError(null);
  };

  if (error) {
    return (
        <ErrorBoundary>
          <div className="error-container">
            <div className="error-message">Error: {error.message}</div>
            <button onClick={resetError}>Get Back</button>
          </div>
        </ErrorBoundary>
    );
  }

  return (
      <ErrorBoundary>
        <div className="container">
          <div className="search-container">
            <div className="search">
              <Search onSearch={handleSearch} />
            </div>
            <button className="error-button" onClick={handleError}>
              Throw Error
            </button>
          </div>
          <div className="results" style={{ height: '80%' }}>
            {loading ? (<div className="loader">Loading...</div>)
                : (<Results results={results} />)}
          </div>
        </div>
      </ErrorBoundary>
  );
};

export default App;