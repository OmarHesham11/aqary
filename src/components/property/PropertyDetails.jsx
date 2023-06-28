import { useLocation } from 'react-router-dom';


const PropertyDetails = () => {

    const location = useLocation();
    const property = location.state.property;

    return (
        <div className='mt-5'>
            <h1> Specific Property </h1>
            <p>{property.address}</p>
            <p>{property.subscribe}</p>
        </div>
    );
}

export default PropertyDetails;