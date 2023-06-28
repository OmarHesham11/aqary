import PropertyCard from "./PropertyCard";
import Loading from "../Loading";
import './PropertiesList.css';
import '../../pages/style.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '../../redux/state/propertySlice';
import { Alert, Row, Col } from "react-bootstrap";





const PropertiesList = () => {
    const dispatch = useDispatch();
    const properties = useSelector((state) => state.properties.properties);
    const loading = useSelector((state) => state.properties.loading);
    const error = useSelector((state) => state.properties.error);

    useEffect(() => {
        dispatch(fetchProperties());
    }, [dispatch]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="d-flex align-items-center justify-content-center vh-100">
                <Alert variant="danger">{`Error: ${error}`}</Alert>
            </div>
        );
    }

    return (

        <Row xs={1} md={4} className="g-2 ms-2 margine-from-top ma me-2 mouse">
            {properties && properties.length > 0 ? (
                properties.map((property) => (
                    <Col key={property._id}>
                        <PropertyCard property={property} />
                    </Col>
                ))
            ) : (
                <div>No properties found.</div>
            )}
        </Row>
    );
};

export default PropertiesList;