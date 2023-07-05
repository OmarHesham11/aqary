import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { fetchCities } from '../../redux/cities/citySlice';
import { useDropzone } from 'react-dropzone';
import './styles/createProperty.css';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { fetchCategories } from '../../redux/categories/Category';

const schema = Joi.object({
  address: Joi.string().min(3).max(100).required(),
  city: Joi.string().min(3).max(50).required(),
  level: Joi.number().min(1).required(),
  area: Joi.number().min(1).required(),
  description: Joi.string().min(10).max(100000).required(),
  price: Joi.number().min(1).required(),
  rooms: Joi.number().min(1).required(),
  baths: Joi.number().min(1).required(),
  // categoryId: Joi.string().required()
});

function PropertyEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities.cities);
  const loading = useSelector((state) => state.cities.loading);
  const error = useSelector((state) => state.cities.error);

  //fetch categories
  const categories = useSelector((state) => state.categories.categories);

  const loadingCategory = useSelector((state) => state.categories.loading);
  const errorCategory = useSelector((state) => state.categories.error);

  const err = useSelector((state) => state.properties.error);

  //Handling payment
  const [formErrors, setFormErrors] = useState({});

  const [image, setImage] = useState([])

  const [propertyData, setPropertyData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (e.target.name == 'price' && value < e.target.min) {
      newValue = e.target.min;
    }

    // Check if the value is greater than the maximum value
    if (e.target.name == 'price' && value > e.target.max) {
      newValue = e.target.max;
    }

    setPropertyData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };



  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`https://aqary-eg.onrender.com/property/${id}`);
        const data = await response.json();
        console.log(data);
        setPropertyData({
          categoryId: data.categoryId,
          address: data.address,
          city: data.city,
          level: data.level,
          area: data.area,
          description: data.description,
          price: data.price,
          rooms: data.rooms,
          baths: data.baths,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchPropertyDetails();
  }, [id]);
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


  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const validationResult = schema.validate(propertyData, { abortEarly: false });

      if (validationResult.error) {
        const errors = {};
        validationResult.error.details.forEach((error) => {
          errors[error.path[0]] = error.message;
          console.log(error);
        });
        setFormErrors(errors);
        return;
      }
      console.log(propertyData);
      const formData = new FormData();
      formData.append('address', propertyData?.address);
      formData.append('city', propertyData?.city);
      formData.append('categoryId', propertyData?.categoryId);
      formData.append('level', propertyData?.level);
      formData.append('rooms', propertyData?.rooms);
      formData.append('baths', propertyData?.baths);
      formData.append('area', propertyData?.area);
      formData.append('description', propertyData?.description);
      formData.append('price', propertyData?.price);

      image.forEach((ig) => {
        formData.append('image', ig);
      });
      console.log(localStorage.getItem('token'));
      axios.patch(`https://aqary-eg.onrender.com/auth/property/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((response) => {
          Swal.fire('success', 'Property edited successfully', 'success');
        })
        .catch((error) => {
          Swal.fire('Error!', error.message, 'error');
        });

    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };


  const {
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

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    console.log(value);
    setPropertyData((prevData) => ({
      ...prevData,
      categoryId: value,
    }));
  };
  const handleCityChange = (e) => {
    const { value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      city: value,
    }));
  };

  useEffect(() => {
    dispatch(fetchCities());
    dispatch(fetchCategories());
    setImage([]);
  }, [dispatch]);

  const URL = window.URL;
  const gtID = propertyData.categoryId?.name

  return (
    <>
      <div className="container form-container" >

        <form className="property-form" onSubmit={handelSubmit} encType="multipart/form-data">

          {err && <p className="text-danger">{err}</p>}

          <div className="row">
            <div className='col'>
              <h3 className="text-center ">Edit Property</h3>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category"> <h3>Category</h3> </label>
            <input type="text" name="category" id="category" value={gtID} className="form-control" disabled onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label htmlFor="Address"> <h3>Address</h3> </label>
            <input type="text" name="address" id="Address" value={propertyData.address} className="form-control" onChange={handleInputChange} />
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
              <input type="number" value={propertyData.level} name="level" id="level" className="form-control" onChange={handleInputChange} />
            </div>
            {formErrors?.level && <span className="text-danger">{formErrors?.level}</span>}

            <div className="form-group col">
              <label htmlFor="area"> <h3>area</h3> </label>
              <input type="number" value={propertyData.area} name="area" id="area" className="form-control" onChange={handleInputChange} />
            </div>
            {formErrors?.area && <span className="text-danger">{formErrors?.area}</span>}

            <div className="form-group col">
              <label htmlFor="rooms"> <h3>Rooms</h3> </label>
              <input type="number" value={propertyData.rooms} name="rooms" id="rooms" className="form-control" onChange={handleInputChange} />
            </div>
            {formErrors?.rooms && <span className="text-danger">{formErrors?.rooms}</span>}

            <div className="form-group col">
              <label htmlFor="baths"> <h3>Baths</h3> </label>
              <input type="number" value={propertyData.baths} name="baths" id="baths" className="form-control" onChange={handleInputChange} />
            </div>
            {formErrors?.baths && <span className="text-danger">{formErrors?.baths}</span>}
          </div>

          <div className="row">
            <div className="form-group col">
              <label htmlFor="price"> <h3>Price</h3> </label>
              <input type="number" value={propertyData.price} name="price" id="price" min={0} max={1_000_000_000} className="form-control" onChange={handleInputChange} />
              {formErrors?.price && <span className="text-danger">{formErrors?.price}</span>}
            </div>
          </div>

          {/* <div className="form-group">
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
          </div> */}


          <div className="form-group">
            <label htmlFor="description">
              <h3>Description</h3>
            </label>
            <textarea name="description" id="description" value={propertyData.description} className="form-control" rows="5" onChange={handleInputChange}></textarea>
            {formErrors?.description && <span className="text-danger">{formErrors?.description}</span>}
          </div>
          <button className="btn btn-success align-self-right" type='submit'>
            save
          </button>
        </form>

      </div>
    </>
  );
};



export default PropertyEdit;