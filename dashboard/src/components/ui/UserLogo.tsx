import React from 'react';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from 'store/hook';
import { useGetUserQuery } from 'store/api/usersApi';
import { selectCurrentUser } from 'store/slices/auth';
import * as ICON from 'assets/icons';
import s from './UserLogo.module.sass';

export const UserLogo = () => {
    const navigate = useNavigate();
    const user = useAppSelector(selectCurrentUser);
    const { data } = useGetUserQuery(user.id, { skip: !user.id });

    const showProfile = () => {
        navigate("/dashboard/profile");
    }

    return (
        <div className={s.userContainer} onClick={showProfile}>
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
