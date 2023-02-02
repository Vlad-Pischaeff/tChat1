import React from 'react';
import { tUser } from 'store/api/apiTypes';
import s from './UserProfile.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    user: tUser
}

export const UserProfileDescriptions = ({ user }: iProps) => {

    return (
        <div role="listbox">
            <ItemDescription title="Name: " desc={user.name} />
            <ItemDescription title="E-mail: " desc={user.email} />
        </div>
    );
};

interface iProp extends React.HTMLAttributes<HTMLDivElement> {
    title: string,
    desc: string
}

const ItemDescription = ({ title, desc }: iProp) => {

    return (
        <div className={s.Item} role="listitem">
            <p className={s.ItemTitle}>{title}</p>
            <p className={s.ItemValue}>{desc}</p>
        </div>
    );
};
