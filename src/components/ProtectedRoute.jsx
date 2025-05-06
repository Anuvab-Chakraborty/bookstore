// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { token, role } = useAuthStore();

  // Check if the user is authenticated
  if (!token) return <Navigate to="/login" />;

  // Check if the current route allows the user's role
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={`/${role}/dashboard`} />;
  }

  // If user is authenticated and allowed to access, render the children (protected route content)
  return children;
}
