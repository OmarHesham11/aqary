// import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import "./styles/propertyDetails.css";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DescriptionIcon from "@mui/icons-material/Description";
import LocationCityIcon from "@mui/icons-material/LocationCity";
// import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import Carousel from 'react-bootstrap/Carousel';

const PropertyDetails = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);

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


  return (

    // <section className="text-gray-600 body-font main-section mt-5 mb-5 p-3">

    //   <div className="mx-auto mt-5 mb-5 row">

    //     <div className="col-md-8">
    //       {property && property.photo && (
    //         <img className="object-cover object-center rounded img-fluid me-4" alt="hero" src={property.photo[0]} style={{ width: "1200px", height: "600px" }} />
    //       )}
    //     </div>

    //     <div className="col-md-4">

    //       <h1 className="title-font sm:text-4xl text-3xl mb-3 font-medium text-gray-900"> {property.address} </h1>

    //       <div className="d-flex align-items-center" style={{ marginBottom: "20px" }} >
    //         <ApartmentIcon fontSize="large" />
    //         <span className="ml-3" style={{ marginLeft: "5px", fontSize: "20px" }} > {" "} {property.title} </span>
    //       </div>

    //       <div className="d-flex align-items-center" style={{}}>
    //         <DescriptionIcon fontSize="large" />
    //         <p className="mb-8 my-2 leading-relaxed" style={{ marginLeft: "5px", fontSize: "20px" }} > {property.description} </p>
    //       </div>

    //       <div className="d-flex align-items-center" style={{}}>
    //         <LocationCityIcon fontSize="large" />
    //         <p className="mb-8 my-2 leading-relaxed" style={{ marginLeft: "5px", fontSize: "20px" }} > {property.city} </p>
    //       </div>

    //       <div className="d-flex align-items-center" style={{}}>
    //         <LocalPhoneIcon fontSize="large" />
    //         <p className="mb-8 my-2 leading-relaxed" style={{ marginLeft: "5px", fontSize: "20px" }} > {property.contractPhone} </p>
    //       </div>

    //       <div className="d-flex align-items-center" style={{}}>
    //         <AttachMoneyIcon fontSize="large" />
    //         <p className="mb-8 my-2 leading-relaxed" style={{ marginLeft: "5px", fontSize: "20px", color: "#780000" }} > EGP {property.price} </p>
    //       </div>

    //       <div>
    //         <button className="btn btn-primary btn-lg" style={{ fontSize: "1.5rem", padding: "15px 50px", marginTop: "25px", marginRight: "30px", borderRadius: "25px", }} >
    //           <a href={`tel: +201123141912`} style={{ color: "white", textDecoration: "none" }} > Call me{" "} </a>
    //         </button>

    //         <button className="btn btn-primary btn-lg" style={{ fontSize: "1.5rem", padding: "15px 50px", marginTop: "25px", borderRadius: "25px", }} >
    //           <a href={`tel: +201123141912`} style={{ color: "white", textDecoration: "none" }} > Whatsapp{" "} </a>
    //         </button>

    //       </div>

    //     </div>

    //   </div>

    // </section>

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
    </div>
    </>

  );
};



export default PropertyDetails;