import PropertyCard from "./PropertyCard";
import Loading from "../Loading";
import Pagination from './Pagination';
import NoProperties from './NoProperties';
import "./styles/PropertiesList.css";
import "../../pages/style.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../../redux/state/propertySlice";
import { Alert, Row, Col } from "react-bootstrap";


const PropertiesList = ({ filteredProperties }) => {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.properties.properties);
  console.log(data);
  const loading = useSelector((state) => state.properties.loading);
  const error = useSelector((state) => state.properties.error);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = data.totalPages;
  const currentItems = data.properties || [];
  console.log(currentItems)

  useEffect(() => {
    dispatch(fetchProperties(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100 error-container">
        <Alert variant="danger">{ `Error: ${error} properties` }</Alert>
      </div>
    );
  }


  return (
    <>
      <h1 style={ { margin: 'auto', marginTop: '90px', textTransform: 'uppercase' } } className="text-center d-block f-bold">
        <span style={ { fontFamily: 'Cursive', fontSize: '35px' } }>Welcome to <strong className="text-warning">your home</strong></span>
      </h1>

      <Row xs={ 1 } s={ 1 } md={ 2 } lg={ 3 } className="g-2 ms-2 margin-top-Row mt-3 me-2 mouse">

        { currentItems.length > 0 ? (
          currentItems.map((property) => (
            <Col key={ property._id }>
              <PropertyCard property={ property } />
            </Col>
          ))

        ) : (

          <NoProperties />

        ) }

      </Row>

      <Pagination totalPages={ totalPages } currentPage={ currentPage } onPageChange={ handlePageChange } />

    </>

  );
};



export default PropertiesList;