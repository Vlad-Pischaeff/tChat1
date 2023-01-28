import React from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { useGetUserQuery } from 'store/api/usersApi';
import { selectCurrentUser } from 'store/slices/auth';
import { setServicesModal, selectUIServicesModal, eModal } from "store/slices/ui";
import { UserProfileImage } from './UserProfileImage';
import { UserProfileAddSiteForm } from './UserProfileAddSiteForm';
import * as ICON from 'assets/icons';
import s from './UserProfile.module.sass';

export const UserProfile = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    const servicesModal = useAppSelector(selectUIServicesModal);
    const { data } = useGetUserQuery(user.id, { skip: !user.id });

    const openModalAddSite = () => {
        dispatch(setServicesModal(eModal.addSite));
    }

    return (
        <div className={s.Container}>

            { servicesModal === eModal.addSite &&
                <UserProfileAddSiteForm />
            }

            <div className={s.SubContainer}>

                { data &&
                    <>
                    <div className={s.LeftSubContainer}>
                        <UserProfileImage user={data} />
                        <input
                            type="button"
                            className={s.AddItem}
                            value="load image"
                        />
                    </div>
                    <div className={s.RightSubContainer}>
                        <div className={s.Item}>
                            <p className={s.ItemTitle}>Name: </p>
                            <p className={s.ItemValue}>{data.name}</p>
                        </div>
                        <div className={s.Item}>
                            <p className={s.ItemTitle}>E-mail: </p>
                            <p className={s.ItemValue}>{data.email}</p>
                        </div>
                        {/* <hr/> */}
                        <div className={s.Item}>
                            <div className={s.ItemTitle}>Web-sites: </div>
                            <div className={s.ItemContainer} role="listbox">
                                { data.websites.length === 0
                                    ? <div className={s.ItemNoValue}>No managed sites...</div>
                                    : <>
                                        { data.websites.map(item => {
                                            return <div
                                                        role="listitem"
                                                        key={item.hash}
                                                        className={s.PropertyContainer}
                                                    >
                                                        <p className={s.PropertySite}>{item.site}</p>
                                                        {/* <p className={s.ItemTitle}>hash:</p>
                                                        <p className={s.PropertyHash}>{item.hash}</p> */}
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
                        </div>

                        <input
                            type="button"
                            className={s.AddItem}
                            value="+ add site"
                            onClick={openModalAddSite}
                        />
                    </div>
                        {/* <hr/> */}

                    </>
                }
            </div>
        </div>
    );
};
