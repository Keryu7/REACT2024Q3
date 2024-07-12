import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Search from './Search/search.tsx';
import Results from './Results/results.tsx';
import ErrorBoundary from './ErrorBoundary/errorBoundary.tsx';
import Pagination from './Pagination/pagination.tsx';
import { Result } from '../types';
import { getStarships } from '../services/apiService.tsx';
import '../App.css';

const getInitialPage = (): number => {
    const params: URLSearchParams = new URLSearchParams(location.search);
    const page: string | null = params.get('page');
    return page ? parseInt(page, 10) : 1;
}

const MainComponent: React.FC = () => {
    const location = useLocation();

    const [savedSearch, setSavedSearch] = useState<string>(localStorage.getItem('savedSearch') || '');
    const [results, setResults] = useState<Result[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(getInitialPage());
    const [totalPages, setTotalPages] = useState<number>(1);

    const navigate = useNavigate();

    const fetchResults = useCallback(async (page: number): Promise<void> => {
        const cleanedSavedSearch: string = savedSearch.trim();
        const query: string = cleanedSavedSearch ? cleanedSavedSearch : '';

        try {
            setLoading(true);
            const { results: starships, total_pages, status }: { results: Result[], total_pages: number, status: number } = await getStarships(query, page);
            if (status === 404) {
                navigate(`/404`);
            }
            setResults(starships);
            setTotalPages(total_pages);
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    }, [savedSearch, navigate]);

    useEffect((): void => {
        console.log('VALUE_1', )
        const params = new URLSearchParams(location.search);
        const page = params.get('page');
        setCurrentPage(page ? parseInt(page, 10) : 1);
    }, [location.search]);

    useEffect((): void => {
        fetchResults(currentPage);
    }, [currentPage,fetchResults]);

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
                {!loading && results?.length > 0 && (
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

export default MainComponent;