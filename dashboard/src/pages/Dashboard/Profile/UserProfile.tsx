import React from 'react';
import { useAppSelector } from 'store/hook';
import { useGetUserQuery } from 'store/api/usersApi';
import { selectCurrentUser } from 'store/slices/auth';
import { selectUIServicesModal, eModal } from "store/slices/ui";
import { UserProfileImage } from './UserProfileImage';
import { UserProfileWebsites } from './UserProfileWebsites';
import { UserProfileAddSiteForm } from './UserProfileAddSiteForm';
import s from './UserProfile.module.sass';

export const UserProfile = () => {
    const user = useAppSelector(selectCurrentUser);
    const servicesModal = useAppSelector(selectUIServicesModal);
    const { data } = useGetUserQuery(user.id, { skip: !user.id });

    return (
        <div className={s.Container}>

            { servicesModal === eModal.addSite &&
                <UserProfileAddSiteForm />
            }

            { data &&
                <>
                    <div className={s.LeftSubContainer}>
                        <div>
                            <UserProfileImage user={data} />

                            <div>
                                <div className={s.Item}>
                                    <p className={s.ItemTitle}>Name: </p>
                                    <p className={s.ItemValue}>{data.name}</p>
                                </div>
                                <div className={s.Item}>
                                    <p className={s.ItemTitle}>E-mail: </p>
                                    <p className={s.ItemValue}>{data.email}</p>
                                </div>
                            </div>
                        </div>


                        <input
                            type="button"
                            className={s.AddItem}
                            value="load image"
                        />
                    </div>

                    <div className={s.RightSubContainer}>

                        <UserProfileWebsites />

                    </div>
                </>
            }
        </div>
    );
};
