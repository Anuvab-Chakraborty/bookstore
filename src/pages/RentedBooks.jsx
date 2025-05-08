// import { useEffect, useState } from 'react';
// import { useAuthStore } from '../store/useAuthStore';
// import { motion } from 'framer-motion';
// import { toast } from 'react-toastify'; // Assuming you're using react-toastify
// import api from '../utils/api';
// import { useNavigate } from 'react-router-dom';

// export default function RentedBooks() {
//   const [rentedBooks, setRentedBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { token } = useAuthStore(); // Get token from Auth store for authentication
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRentedBooks = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Fetch rented books from the backend using the API
//         const response = await api.get('/rented_books', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.data && response.data.length > 0) {
//           setRentedBooks(response.data);
//         } else {
//           setRentedBooks([]);
//         }
//       } catch (error) {
//         setError('Error fetching rented books. Please try again later.');
//         toast.error('Failed to fetch rented books');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRentedBooks();
//   }, [token]);

//   const returnBook = async (rentedBookId) => {
//     try {
//       const response = await api.post(`/return_book/${rentedBookId}`, null, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Update the state to remove the returned book from the list
//       setRentedBooks(rentedBooks.filter(book => book.id !== rentedBookId));
//       toast.success(response.data.message);
//     } catch (error) {
//       toast.error('Failed to return the rented book');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col items-center gap-6">
//         <h1 className="text-3xl text-white font-bold mb-4">📦 Your Rented Books</h1>
//         <p className="text-white">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col items-center gap-6">
//         <h1 className="text-3xl text-white font-bold mb-4">📦 Your Rented Books</h1>
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   if (rentedBooks.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col items-center gap-6">
//         <h1 className="text-3xl text-white font-bold mb-4">📦 Your Rented Books</h1>
//         <p className="text-white">You haven't rented any books yet.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col items-center gap-6">
//       <h1 className="text-3xl text-white font-bold mb-4">📦 Your Rented Books</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
//         {rentedBooks.map((book) => (
//           <motion.div
//             key={book.id}
//             whileHover={{ scale: 1.05, rotate: 1 }}
//             whileTap={{ scale: 0.95 }}
//             className="cursor-pointer bg-white/10 border border-blue-600 text-white p-8 rounded-2xl shadow-xl backdrop-blur-md"
//           >
//             <h2 className="text-2xl font-bold text-center">{book.title}</h2>
//             <p className="mt-2 text-center text-blue-300">Rented until: {new Date(book.return_by).toLocaleDateString()}</p>
//             <div className="mt-4 text-center">
//               {new Date(book.return_by) > new Date() && (
//                 <button
//                   onClick={() => returnBook(book.id)}
//                   className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//                 >
//                   Return Book
//                 </button>
//               )}
//               {new Date(book.return_by) <= new Date() && (
//                 <p className="text-red-500">Return date passed!</p>
//               )}
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from 'react';
// import { useAuthStore } from '../store/useAuthStore';
// import { motion } from 'framer-motion';
// import { toast } from 'react-toastify';
// import api from '../utils/api';
// import { useNavigate } from 'react-router-dom';

// export default function RentedBooks() {
//   const [rentedBooks, setRentedBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { token } = useAuthStore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRentedBooks = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await api.get('/rented_books', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.data && response.data.length > 0) {
//           setRentedBooks(response.data);
//         } else {
//           setRentedBooks([]);
//         }
//       } catch (error) {
//         setError('Error fetching rented books. Please try again later.');
//         toast.error('Failed to fetch rented books');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRentedBooks();
//   }, [token]);

//   const returnBook = async (rentalId) => {
//     try {
//       const response = await api.post(`/return_book/${rentalId}`, null, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Remove returned book using rental_id
//       setRentedBooks(rentedBooks.filter(book => book.rental_id !== rentalId));
//       toast.success(response.data.message || 'Book returned successfully!');
//     } catch (error) {
//       toast.error('Failed to return the rented book');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col items-center gap-6">
//         <h1 className="text-3xl text-white font-bold mb-4">📦 Your Rented Books</h1>
//         <p className="text-white">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col items-center gap-6">
//         <h1 className="text-3xl text-white font-bold mb-4">📦 Your Rented Books</h1>
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   if (rentedBooks.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col items-center gap-6">
//         <h1 className="text-3xl text-white font-bold mb-4">📦 Your Rented Books</h1>
//         <p className="text-white">You haven't rented any books yet.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col items-center gap-6">
//       <h1 className="text-3xl text-white font-bold mb-4">📦 Your Rented Books</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
//         {rentedBooks.map((book) => (
//           <motion.div
//             key={book.rental_id}
//             whileHover={{ scale: 1.05, rotate: 1 }}
//             whileTap={{ scale: 0.95 }}
//             className="cursor-pointer bg-white/10 border border-blue-600 text-white p-8 rounded-2xl shadow-xl backdrop-blur-md"
//           >
//             <h2 className="text-2xl font-bold text-center">{book.title}</h2>
//             <p className="text-center text-sm text-blue-300">Author: {book.author}</p>
//             <p className="text-center text-sm text-blue-300">Rented on: {book.rented_on}</p>
//             <p className="text-center text-blue-300">Return by: {new Date(book.return_by).toLocaleDateString()}</p>
//             <p className="text-center text-sm mt-2 text-blue-400">Seller: {book.seller_name}</p>
//             <p className="text-center text-sm text-blue-400">{book.seller_email}</p>

//             <div className="mt-4 text-center">
//               {new Date(book.return_by) > new Date() ? (
//                 <button
//                   onClick={() => returnBook(book.rental_id)}
//                   className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//                 >
//                   Return Book
//                 </button>
//               ) : (
//                 <p className="text-red-500">Return date passed!</p>
//               )}
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function RentedBooks() {
  const [rentedBooks, setRentedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuthStore();
  const navigate = useNavigate();

  // Fetch rented books on mount
  const fetchRentedBooks = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/rented_books', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.length > 0) {
        setRentedBooks(response.data);
      } else {
        setRentedBooks([]);
      }
    } catch (error) {
      setError('Error fetching rented books. Please try again later.');
      toast.error('Failed to fetch rented books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentedBooks(); // Fetch on component mount
  }, [token]); // Re-fetch when token changes

  const returnBook = async (rentalId) => {
    try {
      // Make the API call to return the book
      const response = await api.post(`/return_book/${rentalId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Show success message
      toast.success(response.data.message || 'Book returned successfully!');

      // Refresh the rented books list
      fetchRentedBooks();
    } catch (error) {
      toast.error('Failed to return the rented book');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col items-center gap-6">
        <h1 className="text-3xl text-white font-bold mb-4">📦 Your Rented Books</h1>
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col items-center gap-6">
        <h1 className="text-3xl text-white font-bold mb-4">📦 Your Rented Books</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (rentedBooks.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col items-center gap-6">
        <h1 className="text-3xl text-white font-bold mb-4">📦 Your Rented Books</h1>
        <p className="text-white">You haven't rented any books yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col items-center gap-6">
      <h1 className="text-3xl text-white font-bold mb-4">📦 Your Rented Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {rentedBooks.map((book) => (
          <motion.div
            key={book.rental_id}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer bg-white/10 border border-blue-600 text-white p-8 rounded-2xl shadow-xl backdrop-blur-md"
          >
            <h2 className="text-2xl font-bold text-center">{book.title}</h2>
            <p className="text-center text-sm text-blue-300">Author: {book.author}</p>
            <p className="text-center text-sm text-blue-300">Rented on: {book.rented_on}</p>
            <p className="text-center text-blue-300">Return by: {new Date(book.return_by).toLocaleDateString()}</p>
            <p className="text-center text-sm mt-2 text-blue-400">Seller: {book.seller_name}</p>
            <p className="text-center text-sm text-blue-400">{book.seller_email}</p>

            <div className="mt-4 text-center">
              {new Date(book.return_by) > new Date() ? (
                <button
                  onClick={() => returnBook(book.rental_id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Return Book
                </button>
              ) : (
                <p className="text-red-500">Return date passed!</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
