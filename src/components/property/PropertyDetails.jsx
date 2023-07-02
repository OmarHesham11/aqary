// import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import "./styles/propertyDetails.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import HomeIcon from '@mui/icons-material/Home';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import Carousel from 'react-bootstrap/Carousel';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
const PropertyDetails = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const todayDate = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date());

  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);

  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`https://aqary-eg.onrender.com/property/${propertyId}`);
        const data = await response.json();
        setProperty(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    

    fetchPropertyDetails();
  }, [propertyId]);


  if (!property) {
    return <div>
      <Backdrop
        sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>;
  }

  // check if the text Arabic or not for Property Description
  function isArabicText(text) {
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(text);
}

  return (

    <>
    <div className="container">
      <div className="carousel-wrapper">
      <Carousel>

      {
        
      property.photo.map((src, id) => 
      <Carousel.Item key={id}>
          <img
            className="d-block w-100"
            src={src}
            alt="First slide"
            style={{ objectFit: 'cover', maxHeight: '100%', width: '100%' }}

          />
          {/* <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
          </Carousel.Item>
      )

          
      }


</Carousel>
      </div>
        
      <div className="sub-section">
  <p className="text-secondary fs-7"> {capitalizeFirstLetter(property.title)} &nbsp; &nbsp;{todayDate} </p>
  <h3 className="fw-bold">{property.price.toLocaleString()}  EGP</h3>
  <p className="text-secondary fs-7">{capitalizeFirstLetter(property.title)} For Sale in {property.city}</p>
  <p className="text-secondary fs-7"> <LocationOnIcon />  {capitalizeFirstLetter(property.city)}</p>
</div>
<header className="mb-4">
  <h3 className="fw-bold">Listing Details</h3>
</header>
<table className="table table-striped">
  <tbody>
    <tr>
      <td><HomeIcon className="icon-style"/> <span>  Size (in Meters)</span> </td>
      <td>{property.area} M</td> 
    </tr>
    <tr>
      <td><LocalHotelIcon className="icon-style"/> <span> Rooms</span> </td>
      <td>{property.rooms}</td> 
    </tr>
    <tr>
      <td><BathtubIcon className="icon-style"/> <span> Bath</span> </td>
      <td>{property.baths}</td> 
    </tr>
    <tr>
      <td><ApartmentIcon className="icon-style"/> <span> Level</span> </td>
      <td>{property.level}</td> 
    </tr>
     <tr>
      <td><PersonIcon className="icon-style"/> <span> Owner</span> </td>
      <td>{`${property.user.firstName} ${property.user.lastName}`}</td> 
    </tr>
    <tr>
      <td><EmailIcon className="icon-style" /> <span> Owner's Email</span> </td>
      <td>{property.user.email}</td> 
    </tr>
  </tbody>
</table>

<header className="mb-4">
  <h3 className="fw-bold">Listing Description</h3>
  <div className="container">
  <div className="">
    <p className="text-muted p-description" style={{
      textAlign: property.description && isArabicText(property.description) ? "right" : "left",
    }}>
      {property.description}
    </p>
  </div>
</div>

</header>

<div className="btn-container" style={{ display: 'flex', justifyContent: 'center' }}>
  <Button variant="contained" style={{ fontSize: '20px', padding: '10px 70px', marginRight: '20px' }}>
    <a href={`Tel: ${property.contractPhone}`} style={{ textDecoration: 'none', color: 'white' }}>
      <LocalPhoneIcon style={{ marginRight: '10px' }} /> <span>Call</span>
    </a>
  </Button>

  <Button variant="contained" color="success" style={{ fontSize: '20px', padding: '10px 70px' }}>
    <a href={`https://wa.me/${property.contractPhone}`} target="_blank" style={{ textDecoration: 'none', color: 'white' }} rel="noreferrer">
      <WhatsAppIcon style={{ marginRight: '10px' }} /> <span>WhatsApp</span>
    </a>
  </Button>
</div>


<div onClick={()=>{window.scrollTo(0,0)}}  className="top-arrow">
    <ArrowUpwardIcon />
</div>






    </div>
    </>

  );
};



export default PropertyDetails;