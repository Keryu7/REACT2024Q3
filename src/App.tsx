import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Search from './components/Search/search.tsx';
import Results from './components/Results/results.tsx';
import ErrorBoundary from './components/ErrorBoundary/errorBoundary.tsx';
import NotFound from './components/NotFound/notFound.tsx';
import Pagination from './components/Pagination/pagination.tsx';
import { Result } from './types';
import { getStarships } from './services/apiService.tsx';
import './App.css';

const Main: React.FC = () => {
  const [savedSearch, setSavedSearch] = useState<string>(localStorage.getItem('savedSearch') || '');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchResults = useCallback(async (page: number): Promise<void> => {
    const cleanedSavedSearch: string = savedSearch.trim();
    const query: string = cleanedSavedSearch ? cleanedSavedSearch : '';

    try {
      setLoading(true);
      const { results: starships, total_pages }: { results: Result[], total_pages: number } = await getStarships(query, page);
      setResults(starships);
      setTotalPages(total_pages);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [savedSearch]);

  useEffect((): void => {
    console.log('VALUE_1', )
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    setCurrentPage(page ? parseInt(page, 10) : 1);
  }, [location.search]);

  useEffect((): void => {
    console.log('VALUE_2', )

    if (currentPage) {
      fetchResults(currentPage);
    }
  }, [currentPage, fetchResults]);

  const handleSearch = (newSavedSearch: string): void => {
    localStorage.setItem('savedSearch', newSavedSearch);
    setSavedSearch(newSavedSearch);
    setCurrentPage(1);
    navigate(`/?page=1`);
  };

  const handlePageChange = (newPage: number): void => {
    setCurrentPage(newPage);
    navigate(`/?page=${newPage}`);
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
          <div className="results">
            {loading ? (<div className="loader">Loading...</div>) : (<Results results={results} />)}
          </div>
          {!loading && results.length > 0 && (
              <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
              />
          )}
        </div>
      </ErrorBoundary>
  );
};


const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
};

export default App;
