// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useEffect } from 'react';
// import api from './utils/api';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import AddBook from './pages/AddBook';
// import ProtectedRoute from './components/ProtectedRoute';
// import { useAuthStore } from './store/useAuthStore';

// function App() {
//   const { token, login, logout, loading, setLoading } = useAuthStore();

//   useEffect(() => {
//     const verifyUserToken = async () => {
//       const storedToken = localStorage.getItem('token');
//       if (!storedToken) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await api.get('/verify_token', {
//           headers: { Authorization: `Bearer ${storedToken}` },
//         });
//         const { name, email, role } = res.data;
//         login({ user: { name, email }, token: storedToken, role });
//       } catch (err) {
//         logout();
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyUserToken();
//   }, []); // Run once on mount

//   if (loading) {
//     return <div className="text-white text-center mt-10">Loading...</div>;
//   }

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={token ? <Navigate to={`/${useAuthStore.getState().role}/dashboard`} /> : <Navigate to="/login" />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         <Route
//           path="/seller/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={['seller']}>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/add-book"
//           element={
//             <ProtectedRoute allowedRoles={['seller']}>
//               <AddBook />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/user/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={['user']}>
//               <div className="text-white text-center mt-20">User Dashboard Coming Soon...</div>
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//       <ToastContainer position="top-center" theme="dark" />
//     </Router>
//   );
// }

// export default App;
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useEffect } from 'react';
// import api from './utils/api';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import AddBook from './pages/AddBook';
// import BooksList from './pages/BookList';  // Import your BooksList component
// import ProtectedRoute from './components/ProtectedRoute';
// import { useAuthStore } from './store/useAuthStore';

// function App() {
//   const { token, login, logout, loading, setLoading } = useAuthStore();

//   useEffect(() => {
//     const verifyUserToken = async () => {
//       const storedToken = localStorage.getItem('token');
//       if (!storedToken) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await api.get('/verify_token', {
//           headers: { Authorization: `Bearer ${storedToken}` },
//         });
//         const { name, email, role } = res.data;
//         login({ user: { name, email }, token: storedToken, role });
//       } catch (err) {
//         logout();
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyUserToken();
//   }, []); // Run once on mount

//   if (loading) {
//     return <div className="text-white text-center mt-10">Loading...</div>;
//   }

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={token ? <Navigate to={`/${useAuthStore.getState().role}/dashboard`} /> : <Navigate to="/login" />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         <Route
//           path="/seller/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={['seller']}>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/add-book"
//           element={
//             <ProtectedRoute allowedRoles={['seller']}>
//               <AddBook />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/user/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={['user']}>
//               <div className="text-white text-center mt-20">User Dashboard Coming Soon...</div>
//             </ProtectedRoute>
//           }
//         />
        
//         {/* Add the new Books List Route */}
//         <Route
//           path="/books"
//           element={
//             <ProtectedRoute allowedRoles={['user', 'seller']}> {/* Accessible by both user and seller */}
//               <BooksList /> {/* Your Books List Component */}
//             </ProtectedRoute>
//           }
//         />

//       </Routes>
//       <ToastContainer position="top-center" theme="dark" />
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import api from './utils/api';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddBook from './pages/AddBook';
import BooksList from './pages/BookList';  // Import BooksList component
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthStore } from './store/useAuthStore';
import BookSellersPage from './pages/BookSellersPage';
import RentedBooks from './pages/RentedBooks';
import PurchasedBooks from './pages/PurchasedBooks';
function App() {
  const { token, login, logout, loading, setLoading } = useAuthStore();

  useEffect(() => {
    const verifyUserToken = async () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get('/verify_token', {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        const { name, email, role } = res.data;
        login({ user: { name, email }, token: storedToken, role });
      } catch (err) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyUserToken();
  }, []); // Run once on mount

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to={`/${useAuthStore.getState().role}/dashboard`} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/seller/dashboard"
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-book"
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <AddBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <div className="text-white text-center mt-20">User Dashboard Coming Soon...</div>
            </ProtectedRoute>
          }
        />
        
        {/* Updated Books List Route */}
        <Route
          path="/books"
          element={
            <ProtectedRoute allowedRoles={['user', 'seller']}> {/* Accessible by both user and seller */}
              <BooksList /> {/* Your Books List Component */}
            </ProtectedRoute>
          }
        />
        <Route
          path="//book/:book_id/sellers"
          element={
            <ProtectedRoute allowedRoles={['user', 'seller']}> {/* Accessible by both user and seller */}
              <BookSellersPage /> {/* Your Books List Component */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/purchased-books"
          element={
            <ProtectedRoute allowedRoles={['user', 'seller']}> {/* Accessible by both user and seller */}
              <PurchasedBooks /> {/* Your Books List Component */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/rented-books"
          element={
            <ProtectedRoute allowedRoles={['user', 'seller']}> {/* Accessible by both user and seller */}
              <RentedBooks /> {/* Your Books List Component */}
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-center" theme="dark" />
    </Router>
  );
}

export default App;
// /purchased-books
// /rented-books