// import { useEffect, useState } from 'react';
// import { useAuthStore } from '../store/useAuthStore';
// import { motion } from 'framer-motion';
// import { toast } from 'react-toastify'; // Assuming you're using react-toastify
// import api from '../utils/api';
// import { useNavigate } from 'react-router-dom';

// export default function PurchasedBooks() {
//   const [purchasedBooks, setPurchasedBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { token } = useAuthStore(); // Get token from Auth store for authentication
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPurchasedBooks = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Make the request to the backend to get the purchased books
//         const response = await api.get('/purchased_books', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.data && response.data.length > 0) {
//           setPurchasedBooks(response.data);
//         } else {
//           setPurchasedBooks([]);
//         }
//       } catch (error) {
//         setError('Error fetching purchased books. Please try again later.');
//         toast.error('Failed to fetch purchased books');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPurchasedBooks();
//   }, [token]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col items-center gap-6">
//         <h1 className="text-3xl text-white font-bold mb-4">💰 Your Purchased Books</h1>
//         <p className="text-white">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col items-center gap-6">
//         <h1 className="text-3xl text-white font-bold mb-4">💰 Your Purchased Books</h1>
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   if (purchasedBooks.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col items-center gap-6">
//         <h1 className="text-3xl text-white font-bold mb-4">💰 Your Purchased Books</h1>
//         <p className="text-white">You haven't purchased any books yet.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col items-center gap-6">
//       <h1 className="text-3xl text-white font-bold mb-4">💰 Your Purchased Books</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
//         {purchasedBooks.map((book) => (
//           <motion.div
//             key={book.id}
//             whileHover={{ scale: 1.05, rotate: 1 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => navigate(`/book/${book.id}`)}
//             className="cursor-pointer bg-white/10 border border-green-600 text-white p-8 rounded-2xl shadow-xl backdrop-blur-md"
//           >
//             <h2 className="text-2xl font-bold text-center">{book.title}</h2>
//             <p className="mt-2 text-center text-green-300">Purchased on: {new Date(book.purchased_on).toLocaleDateString()}</p>
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

export default function PurchasedBooks() {
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchasedBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get('/purchased_books', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.length > 0) {
          setPurchasedBooks(response.data);
        } else {
          setPurchasedBooks([]);
        }
      } catch (error) {
        setError('Error fetching purchased books. Please try again later.');
        toast.error('Failed to fetch purchased books');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedBooks();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col items-center gap-6">
        <h1 className="text-3xl text-white font-bold mb-4">💰 Your Purchased Books</h1>
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col items-center gap-6">
        <h1 className="text-3xl text-white font-bold mb-4">💰 Your Purchased Books</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (purchasedBooks.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col items-center gap-6">
        <h1 className="text-3xl text-white font-bold mb-4">💰 Your Purchased Books</h1>
        <p className="text-white">You haven't purchased any books yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col items-center gap-6">
      <h1 className="text-3xl text-white font-bold mb-4">💰 Your Purchased Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {purchasedBooks.map((book) => (
          <motion.div
            key={book.purchase_id}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer bg-white/10 border border-green-600 text-white p-8 rounded-2xl shadow-xl backdrop-blur-md"
          >
            <h2 className="text-xl font-bold text-center">{book.book_title}</h2>
            <p className="text-center text-sm text-gray-300">by {book.book_author}</p>
            <p className="mt-2 text-center text-green-300">Purchased on: {new Date(book.bought_on).toLocaleDateString()}</p>
            <p className="text-center text-yellow-300">Qty: {book.bought_qty}</p>
            <p className="text-center text-cyan-300">Price: ₹{book.bought_price}</p>
            <p className="text-center text-gray-400 mt-2">Sold by: {book.seller_name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
