import { createProperty } from '../../redux/state/propertySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import { fetchCities } from '../../redux/cities/citySlice';
import { useDropzone } from 'react-dropzone';
import Cart from '../Cart';
import './styles/createProperty.css';
import Validation from '../Validation';
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const valueOfAdd = {
    PROPERTY_HOUR: 1,
    PROPERTY_DAY: 2,
    PROPERTY_WEEK: 5,
    PROPERTY_MONTH: 10,
}

function PropertyCreate() {

    const [myFormData, setMyFormData] = useState({});
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const cities = useSelector((state) => state.cities.cities);
    const loading = useSelector((state) => state.cities.loading);
    const error = useSelector((state) => state.cities.error);

    const err = useSelector((state) => state.properties.error);

    //Handling payment
    const [showPopup, setShowPopup] = useState(false);
    const [propertyCreated, setPropertyCreated] = useState(false);


    const [formErrors, setFormErrors] = useState({});

    const [image, setImage] = useState([])
    const [propertyData, setPropertyData] = useState({
        userId: '',
        address: '',
        city: '',
        title: '',
        level: 0,
        rooms: 0,
        baths: 0,
        description: '',
        price: 0,
        area: 0,
        contractPhone: '',
        paymentOption: 'cash',
        subscribe: 'PROPERTY_HOUR',
    });

    const handleClick = () => {
        setShowPopup(true);
    };

    const handleClose = () => {
        setShowPopup(false);

    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPropertyData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const isValidImageFile = (file) => {
        const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
        return acceptedFormats.includes(file.type);
    };

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        setImage((currentImages) => {
            let updatedImages = [...currentImages];
            acceptedFiles.forEach((file) => {
                if (updatedImages.length < 5 && isValidImageFile(file)) {
                    updatedImages.push(file);
                }
            });
            return updatedImages;
        });
    }, []);

    const {
        getRootProps,
        getInputProps,
        isDragActive,

    } = useDropzone({ onDrop });

    const removeImage = (index) => {
        setImage((currentImages) => {
            const updatedImages = [...currentImages];
            updatedImages.splice(index, 1);
            return updatedImages;
        });
    };


    const handleCityChange = (e) => {
        const { value } = e.target;
        setPropertyData((prevData) => ({
            ...prevData,
            city: value,
        }));
    };

    const handelSubmit = async (e) => {
        e.preventDefault();
        try {


            const { isValid, errors } = Validation(propertyData, image);
            if (!isValid) {
                setFormErrors(errors);
                return;
            }

            const formData = new FormData();
            formData.append('address', propertyData?.address);
            formData.append('city', propertyData?.city);
            formData.append('title', propertyData?.title);
            formData.append('level', propertyData?.level);
            formData.append('rooms', propertyData?.rooms);
            formData.append('baths', propertyData?.baths);
            formData.append('area', propertyData?.area);
            formData.append('description', propertyData?.description);
            formData.append('price', propertyData?.price);
            formData.append('contractPhone', propertyData?.contractPhone);
            formData.append('paymentOption', propertyData?.paymentOption);
            formData.append('subscribe', propertyData?.subscribe);

            image.forEach((ig) => {
                formData.append('image', ig);
            });
            setMyFormData(formData);
            const response = await dispatch(createProperty(formData));
            console.log('submitted', response);
            if (response.error) { setFormErrors(error) }
            console.log('1');
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        dispatch(fetchCities());
        setImage([]);
    }, [dispatch]);



    const URL = window.URL;


    return (
        <>
            <div className="container form-container" >

                <form className="property-form" onSubmit={handelSubmit} encType="multipart/form-data">

                    {err && <p className="text-danger">{err}</p>}
                    {propertyCreated && (
                        <div className="success-message" style={{ color: 'green' }}>
                            Property created successfully!
                        </div>
                    )}

                    <div className="row">
                        <div className='col'>
                            <h3 className="text-center ">Create Property</h3>
                        </div>
                        <div className="text-end col">
                            <button type="submit" className="btn btn-warning" onClick={handleClick}>Create</button>
                        </div>
                    </div>


                    <div className="form-group">
                        <label htmlFor="Title"> <h3>Title</h3> </label>
                        <select name="title" id="Title" className="form-control" onChange={handleInputChange}>
                            <option value="">Select a type</option>
                            <option value="villa" selected={propertyData?.title === 'villa'}>Villa</option>
                            <option value="shale" selected={propertyData?.title === 'shale'}>Shale</option>
                            <option value="apartment" selected={propertyData?.title === 'apartment'}>Apartment</option>
                        </select>
                        {formErrors?.title && <span className="text-danger">{formErrors?.title}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="Address"> <h3>Address</h3> </label>
                        <input type="text" name="address" id="Address" className="form-control" onChange={handleInputChange} />
                        {formErrors?.address && <span className="text-danger">{formErrors?.address}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="city"> <h3>City</h3>
                        </label>
                        {loading ? (
                            <p>Loading cities...</p>
                        ) : error ? (
                            <p>Error loading cities: {error}</p>
                        ) : (
                            <select name="city" id="city" className="form-control" onChange={handleCityChange} value={propertyData?.city}>
                                <option value="">Select a city</option>
                                {cities.map((city) => (
                                    <option key={city._id} value={city.name}> {city.name} </option>
                                ))}
                            </select>
                        )}
                        {formErrors?.city && <span className="text-danger">{formErrors?.city}</span>}
                    </div>

                    <div className="row">
                        <div className="form-group col">
                            <label htmlFor="level"> <h3>Levels</h3> </label>
                            <input type="number" name="level" id="level" className="form-control" onChange={handleInputChange} />
                        </div>
                        {formErrors?.level && <span className="text-danger">{formErrors?.level}</span>}

                        <div className="form-group col">
                            <label htmlFor="area"> <h3>area</h3> </label>
                            <input type="number" name="area" id="area" className="form-control" onChange={handleInputChange} />
                        </div>
                        {formErrors?.area && <span className="text-danger">{formErrors?.area}</span>}

                        <div className="form-group col">
                            <label htmlFor="rooms"> <h3>Rooms</h3> </label>
                            <input type="number" name="rooms" id="rooms" className="form-control" onChange={handleInputChange} />
                        </div>
                        {formErrors?.rooms && <span className="text-danger">{formErrors?.rooms}</span>}

                        <div className="form-group col">
                            <label htmlFor="baths"> <h3>Baths</h3> </label>
                            <input type="number" name="baths" id="baths" className="form-control" onChange={handleInputChange} />
                        </div>
                        {formErrors?.baths && <span className="text-danger">{formErrors?.baths}</span>}
                    </div>

                    <div className="row">
                        <div className="form-group col">
                            <label htmlFor="price"> <h3>Price</h3> </label>
                            <input type="number" name="price" id="price" className="form-control" onChange={handleInputChange} />
                            {formErrors?.price && <span className="text-danger">{formErrors?.price}</span>}
                        </div>

                        <div className="form-group col">
                            <label htmlFor="contractPhone"> <h3>Contract Phone</h3> </label>
                            <input type="text" name="contractPhone" id="contractPhone" className="form-control" onChange={handleInputChange} />
                            {formErrors?.contractPhone && <span className="text-danger">{formErrors?.contractPhone}</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <h3>Payment Option:</h3>
                        <div className="radio-group">
                            <div className="form-check">
                                <input type="radio" name="paymentOption" value="cash" checked={propertyData?.paymentOption === 'cash'} onChange={handleInputChange} className="form-check-input" />
                                <label className="form-check-label">Cash</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" name="paymentOption" value="master-card" checked={propertyData?.paymentOption === 'master-card'} onChange={handleInputChange} className="form-check-input" />
                                <label className="form-check-label">Master Card</label>
                            </div>
                        </div>
                        {formErrors?.paymentOption && <span className="text-danger">{formErrors?.paymentOption}</span>}
                    </div>

                    <div className="form-group">
                        <h3>Subscribe:</h3>
                        <div className="radio-group">

                            <div className="form-check">
                                <input type="radio" name="subscribe" value="PROPERTY_HOUR" defaultChecked checked={propertyData?.subscribe === 'PROPERTY_HOUR'} onChange={handleInputChange} className="form-check-input" />
                                <label className="form-check-label">Hour (1$)</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" name="subscribe" value="PROPERTY_DAY" checked={propertyData?.subscribe === 'PROPERTY_DAY'} onChange={handleInputChange} className="form-check-input" />
                                <label className="form-check-label">Day (2$)</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" name="subscribe" value="PROPERTY_WEEK" checked={propertyData?.subscribe === 'PROPERTY_WEEK'} onChange={handleInputChange} className="form-check-input" />
                                <label className="form-check-label">Week (5$)</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" name="subscribe" value="PROPERTY_MONTH" checked={propertyData?.subscribe === 'PROPERTY_MONTH'} onChange={handleInputChange} className="form-check-input" />
                                <label className="form-check-label">Month (10$)</label>
                            </div>
                        </div>
                        {formErrors?.subscribe && <span className="text-danger">{formErrors?.subscribe}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="image"> <h3>Image</h3> </label>
                        <div>
                            <label htmlFor="image" className="custom-file-upload">
                                {isDragActive ? 'Drop the files here...' : 'Drag and drop files here, or click to select files'}
                            </label>
                            <input {...getInputProps({ multiple: true, id: 'image' })} />

                            {image.length > 0 && (
                                <div>
                                    {image.map((image, index) => (
                                        <div key={index} className="image-container">
                                            <img src={`${URL.createObjectURL(image)}`} alt="" />
                                            <button className="remove-image" onClick={() => removeImage(index)}>
                                                x
                                            </button>
                                        </div>
                                    ))}

                                </div>
                            )}

                            {image.length > 5 && (
                                <p className="text-danger">You can only upload a maximum of 5 images.</p>
                            )}
                            {image.some((file) => !isValidImageFile(file)) && (
                                <p className="text-danger">Only PNG, JPEG, and JPG files are allowed.</p>
                            )}
                        </div>
                        {formErrors?.image && <span className="text-danger">{formErrors?.image}</span>}
                    </div>


                    <div className="form-group">
                        <label htmlFor="description">
                            <h3>Description</h3>
                        </label>
                        <textarea name="description" id="description" className="form-control" rows="5" onChange={handleInputChange}></textarea>
                        {formErrors?.description && <span className="text-danger">{formErrors?.description}</span>}
                    </div>

                </form>

            </div>

            <Modal show={showPopup} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Popup</Modal.Title>
                </Modal.Header >
                <Modal.Body>
                    <Cart amount={valueOfAdd[propertyData?.subscribe]} formData={myFormData} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>


    );
};



export default PropertyCreate;