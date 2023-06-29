import { useLocation } from 'react-router-dom';

import './propertyDetails.css';

const PropertyDetails = () => {

    const location = useLocation();
    const property = location.state.property;

    return (
        // <div className='mt-5' style={{marginTop: "50px"}}>
        //     <h1> Specific Property </h1>
        //     <p>{property.address}</p>
        //     <p>{property.subscribe}</p>
        // </div>

        <section className="text-gray-600 body-font main-section">
        <div className="container  mx-auto  px-5 py-24 row items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 md:col-8">
            <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" />
          </div>
          <div className="md:text-left items-center text-center md:col-4">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Before they sold out
              <br className="hidden lg:inline-block" />readymade gluten
            </h1>
            <p className="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
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