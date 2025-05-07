import { useEffect, useRef, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAuthStore } from '../store/useAuthStore';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const fetchBooks = async ({ pageParam = 1 }) => {
  const token = localStorage.getItem('token');
  const res = await api.get(`/list_books?page=${pageParam}&limit=12`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export default function BooksList() {
  const { token } = useAuthStore();
  const canFetchMore = useRef(true);
  const navigate = useNavigate();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
    getNextPageParam: (lastPage, pages) => {
      const hasMore = lastPage?.has_more;
      if (!hasMore) canFetchMore.current = false;
      return hasMore ? pages.length + 1 : undefined;
    },
    enabled: !!token,
  });

  const handleScroll = useCallback(() => {
    if (!canFetchMore.current || isFetchingNextPage) return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const nearBottom = scrollTop + windowHeight >= docHeight - 100;

    if (nearBottom && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (isLoading)
    return <div className="text-white text-center mt-20">Loading...</div>;

  if (error)
    return (
      <div className="text-white text-center mt-20">
        Error loading books. Please try again later.
      </div>
    );

  const books = data?.pages.flatMap((page) => page.books);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black px-4 sm:px-6 md:px-8 py-10 text-white">
      <h1 className="text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
        📚 All Available Books
      </h1>

      {books && books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book, idx) => (
            <motion.div
              key={book.book_id + '-' + idx}
              className="flex flex-col justify-between bg-white/10 rounded-2xl p-6 backdrop-blur-md shadow-lg transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <h2 className="text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  {book.title}
                </h2>
                <p className="text-purple-300 text-center">{book.author}</p>

                <ul className="mt-4 space-y-4 text-sm">
                  {book.available_from.map((s, i) => (
                    <motion.li
                      key={i}
                      className="border-t border-white/20 pt-2 hover:bg-white/20 rounded-lg transition-all"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex justify-between">
                        <span className="text-sm">
                          Seller: <b>{s.seller_name}</b>
                        </span>
                        <span className="text-sm">Buy: ₹{s.buy_price}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-sm">Rent: ₹{s.rent_price}</span>
                        <span className="text-sm">Qty: {s.available_qty}</span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  className="text-sm text-purple-300 underline hover:text-purple-400"
                  onClick={() =>
                    navigate('/add-book', {
                      state: {
                        book: {
                          book_id: book.book_id,
                          title: book.title,
                          author: book.author,
                          price: book.available_from[0]?.buy_price || '',
                          rent_price: book.available_from[0]?.rent_price || '',
                          qty: book.available_from[0]?.available_qty || '',
                        },
                      },
                    })
                  }
                >
                  ✏️ Edit Book
                </button>
                <button
                  className="text-sm text-blue-300 underline hover:text-blue-400"
                  onClick={() =>
                    navigate(`/book/${book.book_id}/sellers`, {
                      state: { title: book.title },
                    })
                  }
                >
                  🔍 View All Sellers
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-20">No books available.</div>
      )}

      {isFetchingNextPage && (
        <div className="mt-8 text-center text-purple-400 animate-pulse">
          Loading more books...
        </div>
      )}

      {!hasNextPage && !isFetchingNextPage && (
        <div className="mt-8 text-center text-purple-400">
          No more books to load.
        </div>
      )}
    </div>
  );
}
