import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';


export default function TableOfProperties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/property/')
      .then(res => {
        console.log(res.data)
        setProperties(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/property/${id}`)
      .then(res => {
        console.log(res.data);
        setProperties(properties.filter(property => property.id !== id));
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table className={{minWidth: 650}} aria-label="properties table">
        <TableHead>
          <TableRow>
            <TableCell>Photo</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell component="th" scope="row">
                <Link to={`/properties/${property.id}`}>
                  <img src={property.photo[0]} alt="property" width="100" height="100" />
                </Link>
              </TableCell>
              <TableCell>{property.userId}</TableCell>
              <TableCell>{property.address}</TableCell>
              <TableCell>{property.city}</TableCell>
              <TableCell>{property.title}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleDelete(property.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}