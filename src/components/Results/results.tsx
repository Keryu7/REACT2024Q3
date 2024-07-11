import React from 'react';
import { Result, ResultsProps } from '../../types';
import './result.css';

const Results: React.FC<ResultsProps> = ({ results }) => {
  return (
      <div>
        {results.map((result: Result) => (
            <div className="result" key={result.name}>
              <h3>{result.name}</h3>
              <p>{result.model}</p>
            </div>
        ))}
      </div>
  );
};

export default Results;