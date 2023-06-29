import { useLocation } from 'react-router-dom';

import './propertyDetails.css';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DescriptionIcon from '@mui/icons-material/Description';
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
            <div className="d-flex align-items-center">
            <ApartmentIcon fontSize='large' />
            <span className="ml-3" style={{marginLeft: "5px", fontSize: "20px"}}>{property.title}</span>
            </div>
            <div className="d-flex align-items-center">
            <DescriptionIcon fontSize='large' />
            <p className="mb-8 my-2 leading-relaxed" style={{marginLeft: "5px",fontSize: "20px" }}>{property.description}</p>
            </div>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button>
            </div>
          </div>
        </div>
</section>
    );
}

export default PropertyDetails;