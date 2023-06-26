/* eslint-disable react/prop-types */
import Loading from '../Loading';

import { Card } from 'react-bootstrap';
import { faBed, faBath, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const PropertyCard = ({ property }) => {

    return (

        <Card className="text-center rounded-4 justify-content-center m-5 mt-4">
            {property.photo[0] ? (
                <Card.Img variant="top" src={property.photo[0]} className="rounded-top-4 m-auto w-100" alt={`Property Photo 1`} style={{ height: '300px' }} />
            ) : (
                <Loading />
            )}
            <Card.Body>
                <Card.Title>{property.title.charAt(0).toUpperCase() + property.title.slice(1)}</Card.Title>
                <Card.Text>Address: {property.address}</Card.Text>
                <Card.Text>City: {property.city}</Card.Text>
                <Card.Text>
                    <div className="d-flex justify-content-center">
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
                </Card.Text>
                <Card.Text>Description: {property.description.substring(0, 20)}...</Card.Text>
                <Card.Text>Price: <span className="fw-bold">{property.price}</span></Card.Text>
                <Card.Text><hr/></Card.Text>
                <Card.Text>
                    <FontAwesomeIcon icon={faPhone} /> : {property.contractPhone}
                </Card.Text>
            </Card.Body>
        </Card>

    );
};

export default PropertyCard;
