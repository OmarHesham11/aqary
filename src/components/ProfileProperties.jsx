import { Link } from 'react-router-dom';
import Loading from './Loading';
import Pagination from './property/Pagination';
import  NoProperties from './property/NoProperties';
import { useNavigate } from "react-router";
import './property/styles/PropertiesList.css';
import '../pages/style.css';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties, fetchUserProperties } from '../redux/state/propertySlice';
import { Alert, Row, Col } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProfileProperties = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => state.properties.properties);
  const loading = useSelector((state) => state.properties.loading);
  const error = useSelector((state) => state.properties.error);

  const [currentPage, setCurrentPage] = useState(1);
  const [postContent, setPostContent] = useState('');
  const totalPages = data.totalPages;
  const currentItems = data.properties || [];


  console.log(data);



  const handleCreatePost = () => {
    navigate('/postProperty');
  };

  useEffect(() => {
    dispatch(fetchUserProperties());
  }, [dispatch]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100 error-container">
        <Alert variant="danger">{`Error: ${error} properties`}</Alert>
      </div>
    );
  }


  return (
    <>
    <nav className='nav nav-borders' style={{ marginTop: '80px' }}>
      <Link to='/auth/profile' className='nav-link active ms-0'>
        Profile
      </Link>
      <Link to='/auth/profileProperties' className='nav-link'>
        Property
      </Link>
      <Link to='/auth/change-password' className='nav-link'>
        change your password
      </Link>
    </nav>
    <hr className='mt-0 mb-4' />
    <Row xs={1} s={1} md={2} lg={3} className="g-2 ms-2 margin-top-Row mt-3 me-2 mouse">
  {data.length > 0 ? (
    data.map((property, id) => (
      <Col key={id} >
        <Card className="text-center rounded-4 justify-content-center m-5 mt-5">
          <Card.Img variant="top" src={property.photo[0]}  className="rounded-top-4 m-auto w-100"  style={ { height: '300px' } }/>
          <Card.Body>
            <Card.Title>EGP {property.price.toLocaleString()}</Card.Title>
            <Card.Text>{property.address}</Card.Text>
            <Card.Text>Contact Phone : {property.contractPhone}</Card.Text>
            <Link to={`/auth/edit-property/${property._id}`}>            <Button variant="warning" >Update</Button></Link>
          </Card.Body>
        </Card>
      </Col>
    ))
  ) : (
    <NoProperties />
  )}
</Row>


      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />

    </>

  );
}

export default ProfileProperties