import React from 'react';
import { useAppDispatch } from 'store/hook';
import { useDeleteWebsiteMutation } from 'store/api/websitesApi';
import { setServicesModal, setEditedSite, eModal } from 'store/slices/ui';
import { Site } from 'assets/img';
import { iWebsites } from 'store/api/apiTypes';
import * as ICON from 'assets/icons';
import s from './Profile.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    item: iWebsites
}

export const ProfileWebsitesItem = ({ item }: iProps) => {
    const dispatch = useAppDispatch();
    const [ deleteSite ] = useDeleteWebsiteMutation();

    const openModalEditSite = () => {
        dispatch(setEditedSite(item));
        dispatch(setServicesModal(eModal.addSite));
    }

    const removeItem = () => {
        deleteSite({ id: item.id });
    }

    return (
        <div className={s.PropertyContainer}>
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
                onClick={openModalEditSite}
            >
                <ICON.EditIcon />
            </div>
            <div
                className={s.PropertyIcon}
                onClick={removeItem}
            >
                <ICON.TrashIcon />
            </div>
        </div>
    );
};
