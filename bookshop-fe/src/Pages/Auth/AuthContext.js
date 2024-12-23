
// import React, { createContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const storedLoginStatus = localStorage.getItem('isLoggedIn');
//     const storedUserId = localStorage.getItem('userId');
//     if (storedLoginStatus) {
//       setIsLoggedIn(true);
//       setUserId(storedUserId);
//     }
//   }, []);

//   const login = (id) => {
//     setIsLoggedIn(true);
//     setUserId(id);
//     localStorage.setItem('isLoggedIn', 'true');
//     localStorage.setItem('userId', id);
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//     setUserId(null);
//     localStorage.removeItem('isLoggedIn');
//     localStorage.removeItem('userId');
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // const storedLoginStatus = localStorage.getItem('isLoggedIn');
    const storedUserId = localStorage.getItem('userId');
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
      setUserId(storedUserId);
    }
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setUserId(userData.id);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', userData.id);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setUserId(null);
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    // localStorage.removeItem('roleUser');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;












//sua lai ko dung
// import React, { createContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setIsLoggedIn(true);
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = (userData) => {
//     setIsLoggedIn(true);
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
