import React from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { useGetUserQuery } from 'store/api/usersApi';
import { selectCurrentUser } from 'store/slices/auth';
import { setServicesModal, eModal } from "store/slices/ui";
import * as ICON from 'assets/icons';
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
            <div className={s.ItemsListTitle}>Web-sites: </div>

            <div className={s.ItemsContainer} role="listbox">
                { data && data.websites.length === 0
                    ? <div className={s.ItemNoValue}>No managed sites...</div>
                    : <>
                        { data && data.websites.map(item => {
                            return <div
                                        role="listitem"
                                        key={item.hash}
                                        className={s.PropertyContainer}
                                    >
                                        <div className={s.PropertyTitle}>site: </div>
                                        <div className={s.PropertySite}>{item.site}</div>
                                        <div className={s.PropertyTitle}>hash:</div>
                                        <div className={s.PropertyHash}>{item.hash.substring(7)}</div>
                                        <div className={s.PropertyIcon}>
                                            <ICON.EditIcon />
                                        </div>
                                        <div className={s.PropertyIcon}>
                                            <ICON.TrashIcon />
                                        </div>
                                    </div>
                            })
                        }
                    </>
                }
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
