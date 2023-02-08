import React from 'react';
import { useGetUserQuery } from 'store/api/usersApi';
import * as ICON from 'assets/icons';
import s from './Profile.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    userId: string
}

export const ProfileTeamMember = ({ userId }: iProps ) => {
    const { data } = useGetUserQuery(userId, { skip: !userId });

    return (
        <>
            { !!data &&
                <div className={s.PropertyContainer}>
                    <img
                        className={s.PropertyFavIcon}
                        src={data.image}
                        alt=""
                    />

                    <div className={s.PropertyTitle}>name: </div>
                    <div className={s.PropertySite}>{data.name}</div>
                    <div className={s.PropertyTitle}>email:</div>
                    <div className={s.PropertyHash}>{data.email}</div>
                    <div
                        className={s.PropertyIcon}
                        onClick={() => { console.log('edit..') }}
                    >
                        <ICON.EditIcon />
                    </div>
                    <div
                        className={s.PropertyIcon}
                        onClick={() => { console.log('delete..') }}
                    >
                        <ICON.TrashIcon />
                    </div>
                </div>
            }
        </>
    );
};
