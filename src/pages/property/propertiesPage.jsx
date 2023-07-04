import PropertiesList from "../../components/property/PropertiesList";
import FilterButtons from "../../components/filterButtons/FilterButtons";

import { Col, Row } from 'react-bootstrap';
import { useState } from 'react';

const PropertiesPage = () => {


    const [filteredProperties, setFilteredProperties] = useState(null);

    const handleFilterProperties = (filter) => {
        setFilteredProperties(filter);
    };

    return (

        <Row>
            <Col md={ 2 }>
                <FilterButtons onFilter={ handleFilterProperties } />
            </Col>

            <Col md={ 10 }>
                <PropertiesList filteredProperties={ filteredProperties } />
            </Col>

        </Row>

    );
};



export default PropertiesPage;