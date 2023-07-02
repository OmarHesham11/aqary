import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import { searchProperties } from '../../redux/state/propertySlice';


const Searching = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const listContainerRef = useRef(null);
    const containerRef = useRef(null);

    const searchResults = useSelector((state) => state.properties.searchResults);

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        setTimeout(() => {
            if (query.trim() !== '') {
                dispatch(searchProperties(query));
            }
        }, 2000);
    };

    const handleResultClick = (property) => {
        console.log('Clicked on property ID:', property);
        navigate(`/property/${property._id}`);
    };

    useEffect(() => {
        setSearchQuery('');
    }, [location.pathname]);

    const handleScroll = () => {
        const listContainer = listContainerRef.current;
        if (listContainer) {
            const { scrollTop, clientHeight, scrollHeight } = listContainer;
            if (scrollTop + clientHeight === scrollHeight) {
                dispatch(searchProperties(searchQuery));
            }
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setSearchQuery('');
        dispatch(searchProperties(''));
    };


    return (

        <>

            <div className='position-relative'>

                <form className="d-flex me-4" role="search" onSubmit={ handleFormSubmit }>
                    <input type="text" placeholder="City Name" className="form-control ms-4 me-2" aria-label="Search" value={ searchQuery } onChange={ handleSearchChange } />
                </form>

                { searchResults.length > 0 && searchQuery.length > 0 ? (

                    <ul className="list-group position-absolute w-100 p-2 ms-2 mb-1" style={ { top: '100%', zIndex: '1', maxHeight: '200px', overflowY: 'auto' } } onScroll={ handleScroll } ref={ containerRef } >

                        { searchResults.map((property) => (

                            <Link to={ `/property/${property._id}` } className="list-group-item list-group-item-action" key={ property._id } onClick={ () => handleResultClick(property) } >

                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="me-3">{ property.address.substring(0, 30) }...</span>
                                    <span className="badge bg-primary text-white">Price: EGP { property.price }</span>
                                </div>

                            </Link>

                        )) }

                    </ul>

                ) : null }

                { searchQuery.length > 0 && searchResults.length === 0 ? (

                    <div className="position-absolute w-100 p-2 ms-2 mb-1" style={ { top: '100%', zIndex: '1', maxHeight: '200px', overflowY: 'auto' } }>
                        <span className="list-group-item border rounded-3 text-center">Not found Property</span>
                    </div>

                ) : null }

            </div>

        </>

    );
};



export default Searching;