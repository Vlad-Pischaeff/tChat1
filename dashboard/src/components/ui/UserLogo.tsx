import React from 'react';
import { useAppSelector } from 'store/hook';
import { useGetUserQuery } from 'store/api/usersApi';
import { selectCurrentUser } from 'store/slices/auth';
import * as ICON from 'assets/img';
import s from './UserLogo.module.sass';

export const UserLogo = () => {
    const user = useAppSelector(selectCurrentUser);
    const { data } = useGetUserQuery(user.id, { skip: !user.id });

    return (
        <div className={s.userContainer}>
            { data &&
                <>
                    { data.image !== 'none'
                        ? <img src={data.image} className={s.userImage} alt="avatar" />
                        : <ICON.ProfileIcon />
                    }
                    <p>{data.name}</p>
                </>
            }
        </div>
    );
};
