

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './HomePanel.css';

// const HomePanel = () => {
//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:8080/api/categories/get-all')
//       .then(response => {
//         setCategories(response.data.data);
//       })
//       .catch(err => {
//         setError('Failed to fetch categories.');
//       });
//   }, []);

//   if (error) return <p>{error}</p>;

//   return (
//     <div className="side-panel">
//       <h2>Thể loại</h2>
//       <ul>
//         {categories.length > 0 ? categories.map(category => (
//           <li key={category.id}>
//             <Link to={`/category/${category.id}`}>{category.name}</Link>
//           </li>
//         )) : <p>Hiện không có thể loại nào</p>}
//       </ul>
//       <Link to="/search" className="link-search">Tìm kiếm nâng cao</Link>

//     </div>
//   );
// };

// export default HomePanel;

// HomePanel.jsx
import React, { useEffect, useState } from 'react';
import { fetchAllCategories } from '../../api';
import { Link } from 'react-router-dom';
import './HomePanel.css';

const HomePanel = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllCategories()
      .then(response => {
        setCategories(response);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch categories.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return (
    <div>
      <p>{error}</p>
      <button onClick={() => {
        setLoading(true);
        setError(null);
        fetchAllCategories()
          .then(response => {
            setCategories(response);
            setLoading(false);
          })
          .catch(err => {
            setError('Failed to fetch categories.');
            setLoading(false);
          });
      }}>Retry</button>
    </div>
  );

  return (
    <div className="side-panel">
      <h2>Thể loại</h2>
      <ul>
        {categories.length > 0 ? categories.map(category => (
          <li key={category.id}>
            <Link to={`/category/${category.id}`}>{category.name}</Link>
          </li>
        )) : <p>Hiện không có thể loại nào</p>}
      </ul>
      <Link to="/search" className="link-search">Tìm kiếm nâng cao</Link>
    </div>
  );
};

export default HomePanel;
