import React from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { useGetUserQuery } from 'store/api/usersApi';
import { selectCurrentUser } from 'store/slices/auth';
import { setServicesModal, eModal } from "store/slices/ui";
import { UserProfileWebsitesItem } from './UserProfileWebsitesItem';
import s from './UserProfile.module.sass';

export const UserProfileWebsites = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    const { data } = useGetUserQuery(user.id, { skip: !user.id });

    const openModalAddSite = () => {
        dispatch(setServicesModal(eModal.addSite));
    }

    return (
        <div className={s.ManagedSitesContainer}>
            <div className={s.ManagedSitesSubContainer}>
                <div className={s.ItemsListTitle}>Web-sites: </div>

                <div className={s.ItemsContainer} role="listbox">
                    { data && data.websites.length === 0
                        ? (
                            <div className={s.MainPlaceholder}>
                                <p>No managed sites...</p>
                            </div>
                        )
                        : (
                            data && data.websites.map(item => {
                                return (
                                    <div key={item.key}>
                                        <UserProfileWebsitesItem item={item} />
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </div>

            <input
                type="button"
                className={s.AddItem}
                value="+ add site"
                onClick={openModalAddSite}
            />
        </div>
    );
};
