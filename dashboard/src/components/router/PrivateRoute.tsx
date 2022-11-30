import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector} from 'store/hook';
import { selectCurrentUser } from 'store/slices/auth';

type Props = { children: ReactElement | null }

export const PrivateRoute = ({ children }: Props) => {
    const user = useAppSelector(selectCurrentUser);

	// if (loading) return <div>loading...</div>;

	return user.id
        ? children
        : <Navigate to="/" />;
};
