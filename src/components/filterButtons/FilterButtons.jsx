import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchCategories, fetchCategory } from '../../redux/state/categorySlice';
import { filterPropertiesByPrice } from '../../redux/state/propertySlice';
import './filterButtons.css'; // Import the CSS file for styling

const FilterButtons = ({ onFilter }) => {
  const categories = useSelector((state) => state.categories.categories);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryFilter = (categoryId) => {
    dispatch(fetchCategory(categoryId));
    onFilter(categoryId); // Notify the parent component about the filter change
  };

  const handlePriceFilter = (priceRange) => {
    dispatch(filterPropertiesByPrice(priceRange));
    onFilter(priceRange); // Notify the parent component about the filter change
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: { error }</div>;
  }

  return (


    <div className="filter-buttons-container ms-3">

      <div className="category-filter">
        <h4>Filter by Category:</h4>
        { categories.map((category) => (
          <button key={ category._id } className="category-button" onClick={ () => handleCategoryFilter(category._id) } > { category.name } </button>
        )) }
      </div>

      <div className="price-filter">
        <h4>Filter by Price:</h4>
        <button onClick={ () => handlePriceFilter({ min: 200000 }) }> More than EGP 200K </button>
        <button onClick={ () => handlePriceFilter({ min: 400000 }) }> More than EGP 400K </button>
        <button onClick={ () => handlePriceFilter({ min: 800000 }) }> More than EGP 800K </button>
      </div>

    </div>

  );
};



export default FilterButtons;