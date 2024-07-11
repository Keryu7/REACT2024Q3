import { useState, useEffect } from 'react';

const useLocalStorage = (key: string, initialValue: string) => {
    const [storedValue, setStoredValue] = useState<string>(() => {
        try {
            const item: string | null = localStorage.getItem(key);
            return item ? item : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = (value: string) => {
        setStoredValue(value);
        localStorage.setItem(key, value);
    };

    useEffect(() => {
        return () => {
            localStorage.setItem(key, storedValue);
        };
    }, [key, storedValue]);

    return [storedValue, setValue] as const;
};

export default useLocalStorage;