import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStarshipDetails } from '../../services/apiService.tsx';
import { Result } from '../../types';
import './details.css';

const Details: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    //const location = useLocation();
    const [details, setDetails] = useState<Result | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                const starshipDetails = await getStarshipDetails(id);
                setDetails(starshipDetails);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    const closeDetails = () => {
        window.history.pushState({}, '', '/');
    };

    if (error) {
        return <div className="error-message">Error: {error.message}</div>;
    }

    return (
        <div className="details-container">
            {loading ? (
                <div className="loader">Loading...</div>
            ) : (
                details && (
                    <div className="details">
                        <button onClick={closeDetails}>Close</button>
                        <h2>{details.name}</h2>
                        <p><strong>Model:</strong> {details.model}</p>
                        <p><strong>Manufacturer:</strong> {details.manufacturer}</p>
                        <p><strong>Length:</strong> {details.length}</p>
                        <p><strong>Cost:</strong> {details.cost_in_credits}</p>
                    </div>
                )
            )}
        </div>
    );
};

export default Details;
