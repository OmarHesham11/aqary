import React from 'react'
// validateForm.js

const Validation = (propertyData, image) => {
    let tempErrors = {};

    // // Validate title
    // if (!propertyData.title) {
    //     tempErrors.title = "Title is required";
    // }

    // Validate address
    if (!propertyData.address) {
        tempErrors.address = "Address is required";
    }

    // Validate city
    if (!propertyData.city) {
        tempErrors.city = "City is required";
    }

    // Validate level
    if (propertyData.level <= 0) {
        tempErrors.level = "Level must be greater than 0";
    }

    // Validate area
    if (propertyData.area <= 0) {
        tempErrors.area = "Area must be greater than 0";
    }

    // Validate rooms
    if (propertyData.rooms <= 0) {
        tempErrors.rooms = "Rooms must be greater than 0";
    }

    // Validate baths
    if (propertyData.baths <= 0) {
        tempErrors.baths = "Baths must be greater than 0";
    }

    // Validate price
    if (propertyData.price <= 0) {
        tempErrors.price = "Price must be greater than 0";
    }

    // Validate contractPhone
    if (!propertyData.contractPhone) {
        tempErrors.contractPhone = "Contract phone is required";
    }

    // Validate images
    if (image.length === 0) {
        tempErrors.image = "At least one image is required";
    }

    // Validate description
    if (!propertyData.description) {
        tempErrors.description = "Description is required";
    }

    return { isValid: Object.keys(tempErrors).length === 0, errors: tempErrors };
};



export default Validation;