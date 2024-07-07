export interface AppState {
  savedSearch: string;
  results: Result[];
  error: Error | null;
}

export interface ResultsProps {
  results: Result[];
}

export interface Result {
  name: string;
  model: string;
  manufacturer: string;
}

export interface SearchProps {
  onSearch: (savedSearch: string) => void;
}

export interface SearchState {
  savedSearch: string;
}
