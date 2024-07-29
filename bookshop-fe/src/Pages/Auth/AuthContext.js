// // AuthContext.js
// import React, { createContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const storedLoginStatus = localStorage.getItem('isLoggedIn');
//     if (storedLoginStatus) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const login = () => {
//     setIsLoggedIn(true);
//     localStorage.setItem('isLoggedIn', 'true');
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//     localStorage.removeItem('isLoggedIn');
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    const storedUserId = localStorage.getItem('userId');
    if (storedLoginStatus) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
    }
  }, []);

  const login = (id) => {
    setIsLoggedIn(true);
    setUserId(id);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', id);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
