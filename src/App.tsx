import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './components/Search/search.tsx';
import Results from './components/Results/results.tsx';
import ErrorBoundary from './components/ErrorBoundary/errorBoundary.tsx';
import NotFound from './components/NotFound/notFound.tsx';
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
      <Router>
        <ErrorBoundary>
          <div className="container">
            <Routes>
              <Route path="/" element={
                <div>
                  <div className="search-container">
                    <div className="search">
                      <Search onSearch={handleSearch} />
                    </div>
                    <button className="error-button" onClick={handleError}>
                      Throw Error
                    </button>
                  </div>
                  <div className="results" style={{ height: '80%' }}>
                    {loading ? (<div className="loader">Loading...</div>) : (<Results results={results} />)}
                  </div>
                </div>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </ErrorBoundary>
      </Router>
  );
};

export default App;