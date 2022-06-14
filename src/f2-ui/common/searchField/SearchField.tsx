import React, {useEffect, useState} from 'react';
import s from './SearchField.module.css';

type SearchFieldType = {
    searchCallback: (search: string) => void
    placeholder: string
    initState: string
}

const SearchField = (props: SearchFieldType) => {
    const [searchTerm, setSearchTerm] = useState<string>(props.initState);
    const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 1000);

    // Effect for API call
    useEffect(
        () => {
            props.searchCallback(debouncedSearchTerm)
        }, [debouncedSearchTerm, props] // Only call effect if debounced search term changes
    );

    useEffect(() => {
        setSearchTerm(props.initState)
    }, [props.initState])

    return (
        <div className={s.searchWrapper}>
            <input
                className={s.searchInput}
                type="search"
                placeholder={props.placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.currentTarget.value)}
            />
        </div>
    );
};

export default SearchField;

function useDebounce<T>(value: T, delay: number): T {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(
        () => {
            // Update debounced value after delay
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            // Cancel the timeout if value changes (also on delay change or unmount)
            // This is how we prevent debounced value from updating if value is changed ...
            // .. within the delay period. Timeout gets cleared and restarted.
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
}
