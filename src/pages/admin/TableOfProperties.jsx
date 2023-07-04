import { useState, useEffect, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, TablePagination } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';


function TableOfProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0, totalPages: 0 });
  const [filters, setFilters] = useState({ address: '', city: '', title: '', subscribe: '', minPrice: '', maxPrice: '' });

  const handleFiltersChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    setPagination(prevPagination => ({ ...prevPagination, page: 1 }));
    // getProperties();
  };

  const handlePageChange = (event, newPage) => {
    setPagination(prevPagination => ({ ...prevPagination, page: newPage + 1 }));
    // getProperties();
  };

  const handlePageSizeChange = (event) => {
    const newPageSize = parseInt(event.target.value);
    setPagination(prevPagination => ({ ...prevPagination, pageSize: newPageSize, page: 1 }));
    // getProperties();
  };

  const getProperties = () => {
    axios.get('https://aqary-eg.onrender.com/backOffice/dashboard/properties', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { ...pagination, ...filters },
    })
    .then(res => {
      setProperties(res.data.data);
      setPagination(prevPagination => ({ ...prevPagination, total: res.data.pagination.total, totalPages: res.data.pagination.totalPages }));
      setLoading(false);
    })
    .catch(error => {
      Swal.fire('Error', error.message, 'error');
      setLoading(false);
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(true);
      getProperties();
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [filters, pagination.page, pagination.pageSize]);

  const handleDelete = (id) => {
    axios.delete(`https://aqary-eg.onrender.com/backOffice/property/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        Swal.fire('Deleted Success', 'property deletect succusflly', 'success');
        setProperties(properties.filter(property => property._id !== id));
      })
      .catch(error => {
        Swal.fire('Error', error.message, 'error');
      });
  };

  return (
    <>
      <TextField
        name="address"
        label="Address"
        variant="standard"
        size="small"
        value={filters.address}
        onChange={handleFiltersChange}
      />
      <TextField
        name="city"
        label="City"
        variant="standard"
        size="small"
        value={filters.city}
        onChange={handleFiltersChange}
      />
      <TextField
        name="title"
        label="Title"
        variant="standard"
        size="small"
        value={filters.title}
        onChange={handleFiltersChange}
      />
      <TextField
        name="subscribe"
        label="Subscribe"
        variant="standard"
        size="small"
        value={filters.subscribe}
        onChange={handleFiltersChange}
      />
      <TextField
        name="minPrice"
        label="Min Price"
        variant="standard"
        size="small"
        value={filters.minPrice}
        onChange={handleFiltersChange}
      />
      <TextField
        name="maxPrice"
        label="Max Price"
        variant="standard"
        size="small"
        value={filters.maxPrice}
        onChange={handleFiltersChange}
      />
      <TableContainer component={Paper}>
        <Table aria-label="properties table">
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Subscribe</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={7}>Loading...</TableCell>
              </TableRow>
            )}
            {!loading && properties.length === 0 && (
              <TableRow>
                <TableCell colSpan={7}>No properties found.</TableCell>
              </TableRow>
            )}
            {!loading && properties.map((property) => (
              <TableRow key={property._id}>
                <TableCell component="th" scope="row">
                  <Link to={`/property/${property._id}`}>
                    <img src={property.photo[0]} alt="property" width="100" height="100" />
                  </Link>
                </TableCell>
                <TableCell>{property.user?.email}</TableCell>
                <TableCell>{property.address}</TableCell>
                <TableCell>{property.city}</TableCell>
                <TableCell>{property.title}</TableCell>
                <TableCell>{property.subscribe}</TableCell>
                <TableCell>{property.price}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(property._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!loading && properties.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={pagination.total}
            rowsPerPage={pagination.pageSize}
            page={pagination.page - 1}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handlePageSizeChange}
          />
        )}
      </TableContainer>
    </>
  );
}

export default memo(TableOfProperties);