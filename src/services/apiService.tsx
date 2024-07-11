import { Result } from '../types';

export const getStarships = async (query: string): Promise<Result[]> => {
  const fetchResults: Response = await fetch(`https://swapi.dev/api/starships?search=${query}`);
  const response = await fetchResults.json();
  return response.results;
};

export const getStarshipDetails = async (id: string | undefined): Promise<Result> => {
  const fetchResults: Response = await fetch(`https://swapi.dev/api/starships/${id}/`);
  const response = await fetchResults.json();
  return response.results;
};