import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const isAdminUser = (localStorage.getItem('user') && isJsonString(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user'))?.roleId);
    setIsAdmin(isAdminUser === '649dd04c59fa040061014390' ? true : false);
  }, []);

  return isAdmin;
};

export default useIsAdmin;