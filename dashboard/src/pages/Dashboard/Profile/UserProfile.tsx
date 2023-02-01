import React from 'react';
import { useAppSelector } from 'store/hook';
import { useGetUserQuery } from 'store/api/usersApi';
import { selectCurrentUser } from 'store/slices/auth';
import { selectUIServicesModal, eModal } from "store/slices/ui";
import { UserProfileImage } from './UserProfileImage';
import { UserProfileChangeImageButton} from './UserProfileChangeImageButton';
import { UserProfileWebsites } from './UserProfileWebsites';
import { UserProfileAddSiteForm } from './UserProfileAddSiteForm';
import { UserProfileChangeImageForm } from './UserProfileChangeImageForm';
import s from './UserProfile.module.sass';

type eProfileModals = Extract<eModal, eModal.addSite | eModal.changeImage >;

export const UserProfile = () => {
    const user = useAppSelector(selectCurrentUser);
    const servicesModal = useAppSelector(selectUIServicesModal);
    const { data } = useGetUserQuery(user.id, { skip: !user.id });

    return (
        <div className={s.Container}>

            {
                {
                    [eModal.addSite]:     <UserProfileAddSiteForm />,
                    [eModal.changeImage]: <UserProfileChangeImageForm />
                }[servicesModal as eProfileModals]
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

                        <UserProfileChangeImageButton />
                    </div>

                    <div className={s.RightSubContainer}>
                        <UserProfileWebsites />
                    </div>
                </>
            }
        </div>
    );
};
