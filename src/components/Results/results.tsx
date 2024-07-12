import React from 'react';
import { Result, ResultsProps } from '../../types';
import './result.css';

const getID = (url: string): number => {
    return +url.split('/')[url.split('/').length - 2]
}

const Results: React.FC<ResultsProps> = ({ results, onItemClick }) => {
  return (
      <div>
        {results?.map((result: Result) => (
            <div className="result" key={result?.name} onClick={() => onItemClick(getID(result?.url))}>
              <h3>{result?.name}</h3>
              <p>{result?.model}</p>
            </div>
        ))}
      </div>
  );
};

export default Results;