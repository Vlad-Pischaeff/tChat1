import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setServicesModal, eModal } from 'store/slices/ui';
import { tUser } from 'store/api/apiTypes';
import s from './Profile.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    user: tUser
}

export const ProfileTeam = ({ user }: iProps) => {
    const dispatch = useAppDispatch();

    const openModalAddMember = () => {
        dispatch(setServicesModal(eModal.addMember));
    }

    return (
        <div className={s.ManagedTeamSubContainer}>
            <div className={s.ItemsListTitle}>
                <p>My team members:</p>
                <input
                    type="button"
                    className={s.AddItem}
                    value="+ add new member"
                    onClick={openModalAddMember}
                />
            </div>

            <div className={s.ItemsContainer} role="listbox">
                { !!user &&
                            <div className={s.MainPlaceholder} role="listitem">
                                <p>No members...</p>
                            </div>
                        // :   data.map(item => {
                        //         return (
                        //             <div key={item.key} role="listitem">
                        //                 <ProfileWebsitesItem item={item} />
                        //             </div>
                        //         )
                        //     })
                }
            </div>

            {/* { isLoading && <div>Loading...</div>} */}
        </div>
    );
};
