import { Result } from '../types';

export const getStarships = async (query: string, page: number): Promise<{ results: Result[], total_pages: number }> => {
  const fetchResults = await fetch(`https://swapi.dev/api/starships/?search=${query}&page=${page}`);
  const response = await fetchResults.json();
  return {
    results: response.results,
    total_pages: Math.ceil(response.count / 10),
  };
};

export const getStarshipDetails = async (id: string | undefined): Promise<Result> => {
  const fetchResults: Response = await fetch(`https://swapi.dev/api/starships/${id}/`);
  const response = await fetchResults.json();
  return response.results;
};