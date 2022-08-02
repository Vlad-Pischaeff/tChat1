import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector} from '../../store/hook';
import { selectCurrentUser } from '../../store/slices/auth';

export const PrivateRoute = ({ children }) => {
    const user = useAppSelector(selectCurrentUser);

	// if (loading) return <div>loading...</div>;

	return user.id 
        ? children 
        : <Navigate to="/" />;
};
