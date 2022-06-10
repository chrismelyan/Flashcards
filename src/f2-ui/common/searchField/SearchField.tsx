import React, {useEffect, useState} from 'react';
import s from './SearchField.module.css';
import {useAppDispatch} from "../../../f3-bll/store";
import {searchPacksByName} from "../../../f3-bll/reducers/pack-reducer";

const SearchField = () => {
    const dispatch = useAppDispatch()
    const [searchTerm, setSearchTerm] = useState<string>("");
    // Debounce search term so that it only gives us latest value ...
    // ... if searchTerm has not been updated within last 500ms.
    // The goal is to only have the API call fire when user stops typing ...
    // ... so that we aren't hitting our API rapidly.
    // We pass generic type, this case string
    const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 1000);

    // Effect for API call
    useEffect(
        () => {
                dispatch(searchPacksByName(debouncedSearchTerm))
        },
        [debouncedSearchTerm] // Only call effect if debounced search term changes
    );

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setSearch(e.currentTarget.value)
    // }
    //
    // const debounce = <T extends (...args: any[]) => any>(
    //     callback: T,
    //     waitFor: number
    // ) => {
    //     let timeout: ReturnType<typeof setTimeout>;
    //     return (...args: Parameters<T>): ReturnType<T> => {
    //         let result: any;
    //         clearTimeout(timeout);
    //         timeout = setTimeout(() => {
    //             result = callback(...args);
    //         }, waitFor);
    //         return result;
    //     };
    // };
    // const debounceSearch = debounce(onChangeHandler, 500)

    return (
        <div>
                <input
                    className={s.searchInput}
                    // type="search"
                    placeholder="Search ..."
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
