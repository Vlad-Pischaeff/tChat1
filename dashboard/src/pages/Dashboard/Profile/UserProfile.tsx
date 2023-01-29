import React from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { useGetUserQuery } from 'store/api/usersApi';
import { selectCurrentUser } from 'store/slices/auth';
import { setServicesModal, selectUIServicesModal, eModal } from "store/slices/ui";
import { UserProfileImage } from './UserProfileImage';
import { UserProfileWebsites } from './UserProfileWebsites';
import { UserProfileAddSiteForm } from './UserProfileAddSiteForm';
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

                        <UserProfileWebsites />

                        <input
                            type="button"
                            className={s.AddItem}
                            value="+ add site"
                            onClick={openModalAddSite}
                        />
                    </div>
                    </>
                }
            </div>
        </div>
    );
};
