import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';

function isJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useMemo(() => {
    const BACKEND_URL = 'https://aqary-eg.onrender.com';
    // const BACKEND_URL = 'http://localhost:4000';
      axios.get(`${BACKEND_URL}/backOffice/isadmin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).then((res) => {
        setIsAdmin(true)
      }).catch((err) => {
        setIsAdmin(false);
      });
  }, [localStorage.getItem('user')]);

  return isAdmin;
};

export default useIsAdmin;