import React, { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector} from 'store/hook';
import { selectCurrentUser } from 'store/slices/auth';

type Props = { children: ReactElement<any, any> | null }

export const PrivateRoute: FC<Props> = ({ children }) => {
    const user = useAppSelector(selectCurrentUser);

	// if (loading) return <div>loading...</div>;

	return user.id 
        ? children 
        : <Navigate to="/" />;
};
