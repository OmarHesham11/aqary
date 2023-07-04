import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Dashboard } from '@mui/icons-material';
import useIsAdmin from '../hooks/useAdmin';

const GotoDashboard = () => {
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();

  if(!isAdmin){
    return <></>;
  } 

  const handleClick = () => {
    navigate('/admin');
  };

  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
      }}
      onClick={handleClick}
    >
      <Dashboard />
    </Button>
  );
};

export default GotoDashboard;