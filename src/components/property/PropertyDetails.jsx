import { useLocation } from 'react-router-dom';


const PropertyDetails = () => {

    // const location = useLocation();
    // const property = location.state.property;

    return (
    <section className="text-gray-600 body-font main-section mt-5 p-5">
        <div className="mx-auto row">
          <div className="col-md-8">
            <img className="object-cover object-center rounded img-fluid" alt="hero" src="https://dummyimage.com/720x600" />
          </div>
          <div className="col-md-4">
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