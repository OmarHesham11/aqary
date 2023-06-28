/* eslint-disable react/prop-types */
import Loading from '../Loading';
import './PropertyCard.css';

import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { faBed, faBath, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const PropertyCard = ({ property }) => {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        const propertyUrl = `/property/${property._id}`;        
        const state = { property };        
        navigate(propertyUrl, { state });
    };


    return (

        <Card className="text-center rounded-4 justify-content-center m-5 mt-4"
            onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
        >
            {property.photo[0] ? (
                <Card.Img variant="top" src={property.photo[0]} className="rounded-top-4 m-auto w-100" alt={`Property Photo`} style={{ height: '300px' }} />
            ) : (
                <Loading />
            )}

            <Card.Body>
                <Card.Title>{property.title.charAt(0).toUpperCase() + property.title.slice(1)}</Card.Title>
                <Card.Text>Address: {property.address}</Card.Text>
                <Card.Text>City: {property.city}</Card.Text>
                <div className="d-flex justify-content-center"> {/* Move the div outside the p element */}
                    <div className="ms-4 me-2">
                        <FontAwesomeIcon icon={faBed} /> &nbsp; {property.rooms}
                    </div>
                    <div className="ms-5 me-2">
                        <FontAwesomeIcon icon={faBath} /> &nbsp; {property.baths}
                    </div>
                    <div className="ms-5 me-2">
                        <i className="fa-solid fa-chart-area text-muted"></i> &nbsp; {property.area}
                    </div>
                </div>
                <Card.Text>Description: {property.description.substring(0, 20)}...</Card.Text>
                <Card.Text>Price: <span className="fw-bold">{property.price}</span></Card.Text>
                <hr/>
                <Card.Text>
                    <FontAwesomeIcon icon={faPhone} /> : {property.contractPhone}
                </Card.Text>
                <Button variant="primary" onClick={handleButtonClick}>Details</Button>
            
            </Card.Body>
        
        </Card>

    );
};

export default PropertyCard;
