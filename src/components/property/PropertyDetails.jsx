import { useLocation } from 'react-router-dom';

import './styles/propertyDetails.css';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DescriptionIcon from '@mui/icons-material/Description';
import LocationCityIcon from '@mui/icons-material/LocationCity';
// import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
const PropertyDetails = () => {

    const location = useLocation();
    const property = location.state.property;

    return (
        // <div className='mt-5' style={{marginTop: "50px"}}>
        //     <h1> Specific Property </h1>
        //     <p>{property.address}</p>
        //     <p>{property.subscribe}</p>
        // </div>

        <section className="text-gray-600 body-font main-section mt-5 p-5">
        <div className="mx-auto row">
          <div className="col-md-8">
            <img className="object-cover object-center rounded img-fluid" alt="hero" src={property.photo[0]} />
          </div>
          <div className="col-md-4">
            <h1 className="title-font sm:text-4xl text-3xl mb-3 font-medium text-gray-900">{property.address}
            </h1>
            <div className="d-flex align-items-center" style={{marginBottom : "20px"}}>
            <ApartmentIcon fontSize='large' />
            <span className="ml-3" style={{marginLeft: "5px", fontSize: "20px" }}> {property.title}</span>
            </div>
            <div className="d-flex align-items-center" style={{}}>
            <DescriptionIcon fontSize='large' />
            <p className="mb-8 my-2 leading-relaxed" style={{marginLeft: "5px",fontSize: "20px",  }}>{property.description}</p>
            </div>
            <div className="d-flex align-items-center" style={{}}>
            <LocationCityIcon fontSize='large' />
            <p className="mb-8 my-2 leading-relaxed" style={{marginLeft: "5px",fontSize: "20px",  }}>{property.city}</p>
            </div>
            <div className="d-flex align-items-center" style={{}}>
            <LocalPhoneIcon fontSize='large' />
            <p className="mb-8 my-2 leading-relaxed" style={{marginLeft: "5px",fontSize: "20px",  }}>{property.contractPhone}</p>
            </div>
            <div className="d-flex align-items-center" style={{}}>
            <AttachMoneyIcon fontSize='large' />
            <p className="mb-8 my-2 leading-relaxed" style={{marginLeft: "5px",fontSize: "20px",color: "#780000" }}>EGP {property.price}</p>
            </div>
            <div>
      <button
        className="btn btn-primary btn-lg"
        style={{ fontSize: '1.5rem', padding: '15px 50px', marginTop: "25px", marginRight: "30px",  borderRadius: "25px" }}

      >
        <a href={`tel: +201123141912`} style={{ color: 'white', textDecoration: 'none' }}>Call me </a>
      </button>
      <button
        className="btn btn-primary btn-lg"
        style={{ fontSize: '1.5rem', padding: '15px 50px', marginTop: "25px", borderRadius: "25px" }}

      >
        <a href={`tel: +201123141912`} style={{ color: 'white', textDecoration: 'none' }}>Whatsapp </a>
      </button>
    </div>

          </div>
        </div>
        
</section>
    );
}

export default PropertyDetails;