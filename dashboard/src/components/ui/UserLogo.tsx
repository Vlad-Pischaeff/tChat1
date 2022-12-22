import React from 'react';
import { useAppSelector } from 'store/hook';
import { useGetUserQuery } from 'store/api/usersApi';
import { selectCurrentUser } from 'store/slices/auth';
import s from './UserLogo.module.sass';

export const UserLogo = () => {
    const user = useAppSelector(selectCurrentUser);
    const { data } = useGetUserQuery(user.id, { skip: !user.id });

    return (
        <div className={s.userContainer}>
            { data &&
                <>
                    <img src={data.photo} className={s.userImage} alt="avatar" />
                    <p>{data.name}</p>
                </>
            }
        </div>
    );
};
