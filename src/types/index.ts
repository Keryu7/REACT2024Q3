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
