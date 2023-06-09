import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function TableOfSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    axios.get('https://aqary-eg.onrender.com/backOffice/dashboard/subscriptions/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        const newData = Array.isArray(res.data) ? res.data : [];
        setSubscriptions(newData);
      })
      .catch(error => {
        Swal.fire('Error', error.message, 'error');
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>user</TableCell>
            <TableCell>total charge amounts</TableCell>
            <TableCell>number of times he bought</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscriptions.map((subscription) => (
            <TableRow key={subscription._id}>
              <TableCell>{subscription?.user.firstName + subscription.user.lastName}</TableCell>
              <TableCell>{subscription?.transactionAmount}</TableCell>
              <TableCell>{subscription.propertyCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}