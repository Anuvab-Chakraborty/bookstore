// src/pages/AddBook.jsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import api from '../utils/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  price: yup.number().positive().required('Price is required'),
  rent_price: yup.number().positive().required('Rent price is required'),
  qty: yup.number().integer().positive().required('Quantity is required'),
});

export default function AddBook() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookToEdit = location.state?.book || null;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  // Prefill the form if editing
  useEffect(() => {
    if (bookToEdit) {
      Object.keys(bookToEdit).forEach((key) => {
        if (schema.fields[key]) {
          setValue(key, bookToEdit[key]);
        }
      });
    }
  }, [bookToEdit, setValue]);

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token');

    try {
      if (bookToEdit) {
        // EDIT MODE
        await api.put(`/update_book/${bookToEdit.book_id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Book updated successfully!');
      } else {
        // ADD MODE
        await api.post('/add_book', data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Book added successfully!');
      }

      reset();
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.error || 'Something went wrong';
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/10 text-white p-8 rounded-2xl shadow-xl backdrop-blur-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          {bookToEdit ? '✏️ Edit Book' : '📖 Add Book'}
        </h2>

        {['title', 'author', 'price', 'rent_price', 'qty'].map((field) => (
          <div key={field} className="mb-4">
            <input
              type={field === 'title' || field === 'author' ? 'text' : 'number'}
              placeholder={field.replace('_', ' ').toUpperCase()}
              {...register(field)}
              className="glass-input"
            />
            {errors[field] && (
              <p className="text-red-400 text-sm mt-1">{errors[field]?.message}</p>
            )}
          </div>
        ))}

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full mt-4 py-2 bg-purple-600 hover:bg-purple-700 font-semibold rounded-xl"
        >
          {isSubmitting
            ? bookToEdit
              ? 'Updating...'
              : 'Adding...'
            : bookToEdit
            ? 'Update Book'
            : 'Add Book'}
        </button>
      </form>
    </div>
  );
}
