import { createProperty } from '../../redux/state/propertySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import { fetchCities } from '../../redux/cities/citySlice';
import { useDropzone } from 'react-dropzone';

import './styles/createProperty.css';
import '../Validation';


function PropertyCreate() {


    const dispatch = useDispatch();

    const cities = useSelector((state) => state.cities.cities);
    const loading = useSelector((state) => state.cities.loading);
    const error = useSelector((state) => state.cities.error);

    const err = useSelector((state) => state.properties.error);

    const [formErrors, setFormErrors] = useState({});

    const [image, setImage] = useState([])
    const [propertyData, setPropertyData] = useState({
        userId: '649db4ae75fc1c6db6d97554',
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
        subscribe: 'half',
    });

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
        isDragAccept,
        isDragReject,
    } = useDropzone({ onDrop });

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
            const formData = new FormData();
            formData.append('address', propertyData.address);
            formData.append('city', propertyData.city);
            formData.append('title', propertyData.title);
            formData.append('level', propertyData.level);
            formData.append('rooms', propertyData.rooms);
            formData.append('baths', propertyData.baths);
            formData.append('area', propertyData.area);
            formData.append('description', propertyData.description);
            formData.append('price', propertyData.price);
            formData.append('contractPhone', propertyData.contractPhone);
            formData.append('paymentOption', propertyData.paymentOption);
            formData.append('subscribe', propertyData.subscribe);

            image.forEach((ig) => {
                formData.append('image', ig);
            });
            console.log(formData.get('image'))
            const response = await dispatch(createProperty(formData));
            console.log('submitted', response);
            if (response.error) { setFormErrors(error) }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log(image);
    }, [image]);


    useEffect(() => {
        dispatch(fetchCities());
        setImage([]);
    }, [dispatch]);

    const URL = window.URL;


    return (

        <div className="container" >

            <div className="row justify-content-center">

                <div className="col-lg-6">

                    <form className="property-form" onSubmit={ handelSubmit } encType="multipart/form-data">

                        { err && <p className="text-danger">{ err }</p> }

                        <div className="row">
                            <div className='col'>
                                <h3 className="text-center ">Create Property</h3>
                            </div>
                            <div className="text-end col">
                                <button type="submit" className="btn btn-primary">Create</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="Title"> <h3>Title</h3> </label>
                            <select name="title" id="Title" className="form-control" onChange={ handleInputChange }>
                                <option value="">Select a type</option>
                                <option value="villa" selected={ propertyData.title === 'villa' }>Villa</option>
                                <option value="shale" selected={ propertyData.title === 'shale' }>Shale</option>
                                <option value="apartment" selected={ propertyData.title === 'apartment' }>Apartment</option>
                            </select>
                        </div>


                        <div className="form-group">
                            <label htmlFor="Address"> <h3>Address</h3> </label>
                            <input type="text" name="address" id="Address" className="form-control" onChange={ handleInputChange } />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city"> <h3>City</h3>
                            </label>
                            { loading ? (
                                <p>Loading cities...</p>
                            ) : error ? (
                                <p>Error loading cities: { error }</p>
                            ) : (
                                <select name="city" id="city" className="form-control" onChange={ handleCityChange } value={ propertyData.city }>
                                    <option value="">Select a city</option>
                                    { cities.map((city) => (
                                        <option key={ city._id } value={ city.name }> { city.name } </option>
                                    )) }
                                </select>
                            ) }
                        </div>


                        <div className="form-group">
                            <label htmlFor="level"> <h3>Levels</h3> </label>
                            <input type="number" name="level" id="level" className="form-control" onChange={ handleInputChange } />
                        </div>

                        <div className="form-group">
                            <label htmlFor="area"> <h3>area</h3> </label>
                            <input type="number" name="area" id="area" className="form-control" onChange={ handleInputChange } />
                        </div>

                        <div className="form-group">
                            <label htmlFor="rooms"> <h3>Rooms</h3> </label>
                            <input type="number" name="rooms" id="rooms" className="form-control" onChange={ handleInputChange } />
                        </div>

                        <div className="form-group">
                            <label htmlFor="baths"> <h3>Baths</h3> </label>
                            <input type="number" name="baths" id="baths" className="form-control" onChange={ handleInputChange } />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price"> <h3>Price</h3> </label>
                            <input type="number" name="price" id="price" className="form-control" onChange={ handleInputChange } />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contractPhone"> <h3>Contract Phone</h3> </label>
                            <input type="text" name="contractPhone" id="contractPhone" className="form-control" onChange={ handleInputChange } />
                        </div>

                        <div className="form-group">
                            <h3>Payment Option:</h3>
                            <div className="radio-group">
                                <div className="form-check">
                                    <input type="radio" name="paymentOption" value="cash" checked={ propertyData.paymentOption === 'cash' } onChange={ handleInputChange } className="form-check-input" />
                                    <label className="form-check-label">Cash</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="paymentOption" value="master-card" checked={ propertyData.paymentOption === 'master-card' } onChange={ handleInputChange } className="form-check-input" />
                                    <label className="form-check-label">Master Card</label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <h3>Subscribe:</h3>
                            <div className="radio-group">
                                <div className="form-check">
                                    <input type="radio" name="subscribe" value="half" checked={ propertyData.subscribe === 'half' } onChange={ handleInputChange } className="form-check-input" />
                                    <label className="form-check-label">Half</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="subscribe" value="hour" checked={ propertyData.subscribe === 'hour' } onChange={ handleInputChange } className="form-check-input" />
                                    <label className="form-check-label">Hour</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="subscribe" value="day" checked={ propertyData.subscribe === 'day' } onChange={ handleInputChange } className="form-check-input" />
                                    <label className="form-check-label">Day</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="subscribe" value="week" checked={ propertyData.subscribe === 'week' } onChange={ handleInputChange } className="form-check-input" />
                                    <label className="form-check-label">Week</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="subscribe" value="month" checked={ propertyData.subscribe === 'month' } onChange={ handleInputChange } className="form-check-input" />
                                    <label className="form-check-label">Month</label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="image"> <h3>Image</h3> </label>
                            <div>
                                <div { ...getRootProps() }>
                                    <input { ...getInputProps({ multiple: true }) } />

                                    { isDragActive ? (
                                        <p>Drop the files here...</p>
                                    ) : (
                                        <p>Drag and drop files here, or click to select files</p>
                                    ) }

                                </div>

                                { image.length > 0 && (
                                    <div>
                                        { image.map((image, index) => (
                                            <img src={ `${URL.createObjectURL(image)}` } key={ index } alt="" />
                                        )) }
                                    </div>
                                ) }

                                { image.length > 5 && (
                                    <p className="text-danger">You can only upload a maximum of 5 images.</p>
                                ) }
                                { image.some((file) => !isValidImageFile(file)) && (
                                    <p className="text-danger">Only PNG, JPEG, and JPG files are allowed.</p>
                                ) }
                            </div>
                        </div>

                    </form>

                </div>

            </div>

        </div>

    );
};



export default PropertyCreate;