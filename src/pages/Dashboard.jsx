// // // src/pages/Dashboard.jsx

// import { useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../store/useAuthStore';
// import { motion } from 'framer-motion';

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const { role } = useAuthStore();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col items-center gap-6">
//       <h1 className="text-3xl text-white font-bold mb-4">📊 Dashboard</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
//         {/* Card: List All Books */}
//         <motion.div
//           whileHover={{ scale: 1.05, rotate: 1 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => navigate('/books')}
//           className="cursor-pointer bg-white/10 border border-green-600 text-white p-8 rounded-2xl shadow-xl backdrop-blur-md"
//         >
//           <h2 className="text-2xl font-bold text-center">📚 List All Books</h2>
//           <p className="mt-2 text-center text-green-300">Browse all available books by sellers</p>
//         </motion.div>

//         {/* Card: Add Book (only for sellers) */}
//         {role === 'seller' && (
//           <motion.div
//             whileHover={{ scale: 1.05, rotate: 1 }}
//             whileTap={{ scale: 0.95 }}
//             className="cursor-pointer bg-white/10 border border-purple-600 text-white p-8 rounded-2xl shadow-xl backdrop-blur-md"
//             onClick={() => navigate('/add-book')}
//           >
//             <h2 className="text-2xl font-bold text-center">➕ Add a New Book</h2>
//             <p className="mt-2 text-center text-purple-300">Upload a book to your store</p>
//           </motion.div>
//         )}
//       </div>

//       {/* Fallback for user role */}
//       {role !== 'seller' && (
//         <p className="text-white mt-8 text-lg">Welcome, book lover! 👋</p>
//       )}
//     </div>
//   );
// }

// src/pages/Dashboard.jsx

import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const navigate = useNavigate();
  const { role } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col items-center gap-6">
      <h1 className="text-3xl text-white font-bold mb-4">📊 Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Card: List All Books */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/books')}
          className="cursor-pointer bg-white/10 border border-green-600 text-white p-8 rounded-2xl shadow-xl backdrop-blur-md"
        >
          <h2 className="text-2xl font-bold text-center">📚 List All Books</h2>
          <p className="mt-2 text-center text-green-300">Browse all available books by sellers</p>
        </motion.div>

        {/* Card: Add Book (only for sellers) */}
        {role === 'seller' && (
          <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer bg-white/10 border border-purple-600 text-white p-8 rounded-2xl shadow-xl backdrop-blur-md"
            onClick={() => navigate('/add-book')}
          >
            <h2 className="text-2xl font-bold text-center">➕ Add a New Book</h2>
            <p className="mt-2 text-center text-purple-300">Upload a book to your store</p>
          </motion.div>
        )}

        {/* Card: See All Purchased Books */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/purchased-books')}
          className="cursor-pointer bg-white/10 border border-yellow-600 text-white p-8 rounded-2xl shadow-xl backdrop-blur-md"
        >
          <h2 className="text-2xl font-bold text-center">💰 See All Purchased Books</h2>
          <p className="mt-2 text-center text-yellow-300">View all the books you’ve bought</p>
        </motion.div>

        {/* Card: See All Rented Books */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/rented-books')}
          className="cursor-pointer bg-white/10 border border-blue-600 text-white p-8 rounded-2xl shadow-xl backdrop-blur-md"
        >
          <h2 className="text-2xl font-bold text-center">📦 See All Rented Books</h2>
          <p className="mt-2 text-center text-blue-300">View all the books you’ve rented</p>
        </motion.div>
      </div>

      {/* Fallback for user role */}
      {role !== 'seller' && (
        <p className="text-white mt-8 text-lg">Welcome, book lover! 👋</p>
      )}
    </div>
  );
}
