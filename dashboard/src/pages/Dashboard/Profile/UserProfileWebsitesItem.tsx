import React from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { useUpdateUserMutation, useGetUserQuery } from 'store/api/usersApi';
import { selectCurrentUser } from 'store/slices/auth';
import { setServicesModal, setEditedSite, eModal } from "store/slices/ui";
import { Site } from 'assets/img';
import { tWebsite } from 'store/api/apiTypes';
import * as ICON from 'assets/icons';
import s from './UserProfile.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    item: tWebsite
}

export const UserProfileWebsitesItem = ({ item }: iProps) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    const [ updateUser ] = useUpdateUserMutation();
    const { data } = useGetUserQuery(user.id, { skip: !user.id });

    const openModalEditSite = (website: tWebsite) => {
        dispatch(setEditedSite(website));
        dispatch(setServicesModal(eModal.addSite));
    }

    const removeItem = (key: string) => {
        const websites = data?.websites.filter(site => site.key !== key);
        updateUser({ id: user.id, body: { websites }});
    }

    return (
        <div
            role="listitem"
            key={item.hash}
            className={s.PropertyContainer}
        >

            <img
                className={s.PropertyFavIcon}
                src={`https://${item.site}/favicon.ico`}
                alt=""
                onError={(e) => {
                    e.currentTarget.src = `${Site}`
                }}
            />

            <div className={s.PropertyTitle}>site: </div>
            <div className={s.PropertySite}>{item.site}</div>
            <div className={s.PropertyTitle}>hash:</div>
            <div className={s.PropertyHash}>{item.hash.substring(7)}</div>
            <div
                className={s.PropertyIcon}
                onClick={() => openModalEditSite(item)}
            >
                <ICON.EditIcon />
            </div>
            <div
                className={s.PropertyIcon}
                onClick={() => removeItem(item.key)}
            >
                <ICON.TrashIcon />
            </div>
        </div>
    );
};
