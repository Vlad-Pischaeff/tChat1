import React from 'react';
import { tUser } from 'store/api/apiTypes';
import s from './UserProfile.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    user: tUser
}

export const UserProfileDescriptions = ({ user }: iProps) => {

    return (
        <div role="listbox">
            <div className={s.Item} role="listitem">
                <p className={s.ItemTitle}>Name: </p>
                <p className={s.ItemValue}>{user.name}</p>
            </div>
            <div className={s.Item} role="listitem">
                <p className={s.ItemTitle}>E-mail: </p>
                <p className={s.ItemValue}>{user.email}</p>
            </div>
        </div>
    );
};
