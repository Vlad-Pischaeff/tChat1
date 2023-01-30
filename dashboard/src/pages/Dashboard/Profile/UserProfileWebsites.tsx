import React from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { useUpdateUserMutation, useGetUserQuery } from 'store/api/usersApi';
import { selectCurrentUser } from 'store/slices/auth';
import { setServicesModal, setEditedSite, eModal } from "store/slices/ui";
// import { checkIfImageExists } from 'assets/utils';
// import { Site } from 'assets/img';
import { tWebsite } from 'store/api/apiTypes';
import * as ICON from 'assets/icons';
import s from './UserProfile.module.sass';

export const UserProfileWebsites = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    const [ updateUser ] = useUpdateUserMutation();
    const { data } = useGetUserQuery(user.id, { skip: !user.id });

    const openModalAddSite = () => {
        dispatch(setServicesModal(eModal.addSite));
    }

    const openModalEditSite = (website: tWebsite) => {
        dispatch(setEditedSite(website));
        dispatch(setServicesModal(eModal.addSite));
    }

    const removeItem = (key: string) => {
        const websites = data?.websites.filter(site => site.key !== key);
        updateUser({ id: user.id, body: { websites }});
    }

    // const renderFavIcon = (site: string) => {
    //     checkIfImageExists(`https://${item.site}/favicon.ico`, (exists) => {
    //         if (exists) {
    //             return <img className={s.PropertyFavIcon} src={`https://${site}/favicon.ico`} alt="favicon" />
    //         } else {
    //             return <div className={s.PropertyFavIcon}>
    //                 <Site />
    //             </div>
    //         }
    //     });
    // }

    return (
        <div className={s.ManagedSitesContainer}>
            <div className={s.ManagedSitesSubContainer}>
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

                                            <img className={s.PropertyFavIcon} src={`https://${item.site}/favicon.ico`} alt="favicon" />

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
                                })
                            }
                        </>
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
