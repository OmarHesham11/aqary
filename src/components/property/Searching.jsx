import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { searchProperties } from '../../redux/state/propertySlice';


const SearchComponent = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();
    const location = useLocation();
    const searchResults = useSelector((state) => state.properties.searchResults);
    console.log(location.pathname);

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        dispatch(searchProperties(query));
    };

    const handleResultClick = (propertyId) => {
        console.log('Clicked on property ID:', propertyId);
    };

    useEffect(() => {
        setSearchQuery(''); // Reset search query when route changes
    }, [location.pathname]);

    return (

        <>

            <form className="d-flex">
                <input type="text" placeholder="Search" className="form-control ms-4 me-2" aria-label="Search" value={searchQuery} onChange={handleSearchChange} />
            </form>

            {searchResults.length > 0 && searchQuery.length > 0 && (

                    <ul className="list-group position-absolute w-100 p-0 mb-1" style={{ top: '100%', zIndex: '1' }}>
                        {searchResults.map((property) => (
                            <a href={`/property/${property._id}`} className="list-group-item list-group-item-action" key={property._id} onClick={() => handleResultClick(property._id)} > {property.address.substring(0, 20)}... </a>
                        ))}
                    </ul>

                )}

        </>

    );
};

export default SearchComponent;
