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
                    <div className={s.PropertyFlexRow}>
                        <img
                            className={s.PropertyMemberIcon}
                            src={data.image}
                            alt=""
                        />

                        <div>
                            <div className={s.PropertySite}>{data.name}</div>
                            <div className={s.PropertyTitle}>{data.email}</div>
                            <div className={s.PropertyTitle}>{data.alias}</div>
                        </div>
                    </div>

                    <div className={s.PropertyFlexRow}>
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

                </div>
            }
        </>
    );
};
