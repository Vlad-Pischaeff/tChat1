import React from 'react';
// eslint-disable-next-line
import { useAppSelector, useAppDispatch } from 'store/hook';
import { useGetUserQuery } from 'store/api/usersApi';
import { selectCurrentUser } from 'store/slices/auth';
// import { setServicesModal, selectUIServicesModal, eModal } from "store/slices/ui";
// import { UserProfileImage } from './UserProfileImage';
// import { UserProfileAddSiteForm } from './UserProfileAddSiteForm';
import * as ICON from 'assets/icons';
import s from './UserProfile.module.sass';

export const UserProfileWebsites = () => {
    const user = useAppSelector(selectCurrentUser);
    const { data } = useGetUserQuery(user.id, { skip: !user.id });

    return <>
        <div className={s.divider}></div>
        <div className={s.ItemTitle}>Web-sites: </div>

        <div className={s.ItemContainer} role="listbox">
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
                                    <div className={s.PropertyHash}>{item.hash}</div>
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
    </>
};
