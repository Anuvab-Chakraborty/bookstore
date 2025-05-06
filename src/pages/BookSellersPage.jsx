
// import { useEffect, useState } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import api from '../utils/api';
// import { toast } from 'react-toastify';

// export default function BookSellersPage() {
//   const { book_id } = useParams();
//   const { state } = useLocation();
//   const [sellers, setSellers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [showBuyModal, setShowBuyModal] = useState(false);
//   const [showRentModal, setShowRentModal] = useState(false);
//   const [selectedSeller, setSelectedSeller] = useState(null);
//   const [qty, setQty] = useState(1);
//   const [returnDate, setReturnDate] = useState('');

//   useEffect(() => {
//     const fetchSellers = async () => {
//       const token = localStorage.getItem('token');
//       try {
//         const res = await api.get(`/book_availability/${book_id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSellers(res.data);
//       } catch (err) {
//         toast.error('Failed to fetch sellers');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSellers();
//   }, [book_id]);

//   const openBuyModal = (seller) => {
//     setSelectedSeller(seller);
//     setQty(1);
//     setShowBuyModal(true);
//   };

//   const openRentModal = (seller) => {
//     setSelectedSeller(seller);
//     setQty(1);
//     setReturnDate('');
//     setShowRentModal(true);
//   };

//   const closeModals = () => {
//     setShowBuyModal(false);
//     setShowRentModal(false);
//     setSelectedSeller(null);
//   };

//   const handleBuyConfirm = () => {
//     toast.success(`Buying ${qty} book(s) from ${selectedSeller.seller_name}`);
//     closeModals();
//   };

//   const handleRentConfirm = () => {
//     toast.success(
//       `Renting ${qty} book(s) from ${selectedSeller.seller_name} until ${returnDate}`
//     );
//     closeModals();
//   };

//   if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8 text-white">
//       <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
//         📚 Sellers for "{state?.title || 'Book'}"
//       </h2>

//       {sellers.length === 0 ? (
//         <div className="text-center text-purple-400">No sellers found.</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {sellers.map((s, i) => (
//             <div
//               key={i}
//               className="transform hover:scale-105 transition-transform duration-300 bg-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-md hover:shadow-xl"
//             >
//               <h3 className="text-xl font-semibold text-purple-300">Seller: {s.seller_name}</h3>
//               <p className="text-sm text-green-300 mt-2">Buy Price: ₹{s.buy_price}</p>
//               <p className="text-sm text-blue-300">Rent Price: ₹{s.rent_price}</p>
//               <p className="text-sm text-yellow-300">Available Qty: {s.available_qty}</p>
//               <p className="text-sm text-pink-300">Rented Qty: {s.rented_qty}</p>
//               <p className="text-sm text-orange-300">
//                 Next Available: {s.next_available_date || 'N/A'}
//               </p>

//               <div className="mt-4 flex justify-between">
//                 <button
//                   className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200"
//                   onClick={() => openBuyModal(s)}
//                 >
//                   Buy
//                 </button>
//                 <button
//                   className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200"
//                   onClick={() => openRentModal(s)}
//                 >
//                   Rent
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Buy Modal */}
//       {showBuyModal && selectedSeller && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
//           <div className="bg-white/10 text-white p-6 rounded-2xl shadow-lg backdrop-blur-md w-96">
//             <h3 className="text-xl font-bold text-green-300 mb-4">Buy Confirmation</h3>
//             <p className="mb-2">Seller: <span className="text-purple-300">{selectedSeller.seller_name}</span></p>
//             <label className="block mb-2">
//               Quantity:
//               <input
//                 type="number"
//                 min="1"
//                 max={selectedSeller.available_qty}
//                 value={qty}
//                 onChange={(e) => setQty(Number(e.target.value))}
//                 className="w-full p-2 mt-1 rounded-lg bg-gray-800 text-white border border-green-400"
//               />
//             </label>
//             <div className="flex justify-end gap-4 mt-4">
//               <button
//                 onClick={closeModals}
//                 className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleBuyConfirm}
//                 className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Rent Modal */}
//       {showRentModal && selectedSeller && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
//           <div className="bg-white/10 text-white p-6 rounded-2xl shadow-lg backdrop-blur-md w-96">
//             <h3 className="text-xl font-bold text-blue-300 mb-4">Rent Confirmation</h3>
//             <p className="mb-2">Seller: <span className="text-purple-300">{selectedSeller.seller_name}</span></p>
//             <label className="block mb-2">
//               Quantity:
//               <input
//                 type="number"
//                 min="1"
//                 max={selectedSeller.available_qty}
//                 value={qty}
//                 onChange={(e) => setQty(Number(e.target.value))}
//                 className="w-full p-2 mt-1 rounded-lg bg-gray-800 text-white border border-blue-400"
//               />
//             </label>
//             <label className="block mb-2">
//               Return By:
//               <input
//                 type="date"
//                 value={returnDate}
//                 onChange={(e) => setReturnDate(e.target.value)}
//                 className="w-full p-2 mt-1 rounded-lg bg-gray-800 text-white border border-blue-400"
//               />
//             </label>
//             <div className="flex justify-end gap-4 mt-4">
//               <button
//                 onClick={closeModals}
//                 className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleRentConfirm}
//                 className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/useAuthStore';

export default function BookSellersPage() {
  const { book_id } = useParams();
  const { state } = useLocation();
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showRentModal, setShowRentModal] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [qty, setQty] = useState(1);
  const [returnDate, setReturnDate] = useState('');

  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const res = await api.get(`/book_availability/${book_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSellers(res.data);
      } catch (err) {
        toast.error('Failed to fetch sellers');
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, [book_id, token]);

  const openBuyModal = (seller) => {
    setSelectedSeller(seller);
    setQty(1);
    setShowBuyModal(true);
  };

  const openRentModal = (seller) => {
    setSelectedSeller(seller);
    setQty(1);
    setReturnDate('');
    setShowRentModal(true);
  };

  const closeModals = () => {
    setShowBuyModal(false);
    setShowRentModal(false);
    setSelectedSeller(null);
  };

  const handleBuyConfirm = async () => {
    try {
      const res = await api.post(
        '/buy_book',
        {
          book_id,
          seller_id: selectedSeller.seller_id,
          quantity: qty,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(`✅ Bought ${qty} book(s) from ${selectedSeller.seller_name}`);
      closeModals();
    } catch (err) {
      toast.error('❌ Failed to buy book');
    }
  };

  const handleRentConfirm = async () => {
    try {
      const res = await api.post(
        '/rent_book',
        {
          book_id,
          seller_id: selectedSeller.seller_id,
          quantity: qty,
          return_date: returnDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(`✅ Rented ${qty} book(s) from ${selectedSeller.seller_name}`);
      closeModals();
    } catch (err) {
      toast.error('❌ Failed to rent book');
    }
  };

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
        📚 Sellers for "{state?.title || 'Book'}"
      </h2>

      {sellers.length === 0 ? (
        <div className="text-center text-purple-400">No sellers found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sellers.map((s, i) => (
            <div
              key={i}
              className="transform hover:scale-105 transition-transform duration-300 bg-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-md hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold text-purple-300">Seller: {s.seller_name}</h3>
              <p className="text-sm text-green-300 mt-2">Buy Price: ₹{s.buy_price}</p>
              <p className="text-sm text-blue-300">Rent Price: ₹{s.rent_price}</p>
              <p className="text-sm text-yellow-300">Available Qty: {s.available_qty}</p>
              <p className="text-sm text-pink-300">Rented Qty: {s.rented_qty}</p>
              <p className="text-sm text-orange-300">
                Next Available: {s.next_available_date || 'N/A'}
              </p>

              {role === 'user' && (
                <div className="mt-4 flex justify-between">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200"
                    onClick={() => openBuyModal(s)}
                  >
                    Buy
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200"
                    onClick={() => openRentModal(s)}
                  >
                    Rent
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Buy Modal */}
      {showBuyModal && selectedSeller && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white/10 text-white p-6 rounded-2xl shadow-lg backdrop-blur-md w-96">
            <h3 className="text-xl font-bold text-green-300 mb-4">Buy Confirmation</h3>
            <p className="mb-2">Seller: <span className="text-purple-300">{selectedSeller.seller_name}</span></p>
            <label className="block mb-2">
              Quantity:
              <input
                type="number"
                min="1"
                max={selectedSeller.available_qty}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-full p-2 mt-1 rounded-lg bg-gray-800 text-white border border-green-400"
              />
            </label>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={closeModals}
                className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleBuyConfirm}
                className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rent Modal */}
      {showRentModal && selectedSeller && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white/10 text-white p-6 rounded-2xl shadow-lg backdrop-blur-md w-96">
            <h3 className="text-xl font-bold text-blue-300 mb-4">Rent Confirmation</h3>
            <p className="mb-2">Seller: <span className="text-purple-300">{selectedSeller.seller_name}</span></p>
            <label className="block mb-2">
              Quantity:
              <input
                type="number"
                min="1"
                max={selectedSeller.available_qty}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-full p-2 mt-1 rounded-lg bg-gray-800 text-white border border-blue-400"
              />
            </label>
            <label className="block mb-2">
              Return By:
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full p-2 mt-1 rounded-lg bg-gray-800 text-white border border-blue-400"
              />
            </label>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={closeModals}
                className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleRentConfirm}
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
