import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setServicesModal, eModal } from 'store/slices/ui';
import { UserProfileWebsitesItem } from './UserProfileWebsitesItem';
import { tUser } from 'store/api/apiTypes';
import s from './UserProfile.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    user: tUser
}

export const UserProfileWebsites = ({ user }: iProps) => {
    const dispatch = useAppDispatch();

    const openModalAddSite = () => {
        dispatch(setServicesModal(eModal.addSite));
    }

    return (
        <div className={s.ManagedSitesContainer}>
            <div className={s.ManagedSitesSubContainer}>
                <div className={s.ItemsListTitle}>
                    <p>Web-sites:</p>
                    <input
                        type="button"
                        className={s.AddItem}
                        value="+ add site"
                        onClick={openModalAddSite}
                    />
                </div>

                <div className={s.ItemsContainer} role="listbox">
                    { user.websites.length === 0
                        ?   <div className={s.MainPlaceholder} role="listitem">
                                <p>No managed sites...</p>
                            </div>
                        :   user.websites.map(item => {
                                return (
                                    <div key={item.key} role="listitem">
                                        <UserProfileWebsitesItem item={item} />
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        </div>
    );
};
