import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

function getDateTime(date) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  };

  const dateTimeFormatter = new Intl.DateTimeFormat('en-US', options);
  return dateTimeFormatter.format(new Date(date));
}
export default function TableOfTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('https://aqary-eg.onrender.com/transaction/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        setTransactions(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={{minWidth: 650}} aria-label="properties table">
        <TableHead>
          <TableRow>
            <TableCell>user</TableCell>
            <TableCell>amount</TableCell>
            <TableCell>time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((property) => (
            <TableRow key={property._id}>
              <TableCell>{property.userId.name}</TableCell>
              <TableCell>{property.amount}</TableCell>
              <TableCell>{getDateTime(property.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}