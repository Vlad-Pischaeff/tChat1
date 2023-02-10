import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setServicesModal, setEditedMember, eModal } from 'store/slices/ui';
import { useGetUserQuery, useRemoveUserTeamMembersMutation } from 'store/api/usersApi';
import { tMember } from 'store/api/apiTypes';
import * as ICON from 'assets/icons';
import s from './Profile.module.sass';


interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    user: tMember
}

export const ProfileTeamMember = ({ user }: iProps ) => {
    const dispatch = useAppDispatch();
    const { data } = useGetUserQuery(user.member, { skip: !user.member });
    const [ removeUser ] = useRemoveUserTeamMembersMutation();

    const editMemberSites = () => {
        !!data && dispatch(setEditedMember(data));
        dispatch(setServicesModal(eModal.editMemberSites));
    }

    const removeFromTeam = () => {
        if (data) {
            removeUser({ body: { memberID: data.id }});
        }
    }

    return (
        <>
            { !!data &&
                <div className={s.PropertyContainer} style={{ 'padding': '8px' }}>
                    <div className={s.PropertyFlexRow}>
                        <img
                            className={s.PropertyMemberIcon}
                            src={data.image}
                            alt=""
                        />

                        <div>
                            <div className={s.PropertySite}>{data.name}</div>
                            <div className={s.PropertyTitle}>{data.email}</div>
                            <div className={s.PropertyTitle}>{data.alias}</div>
                        </div>
                    </div>

                    <div>
                        { user.sites.length === 0
                            ?   <div className={s.PropertyTitle}>
                                    <p>No observed sites...</p>
                                </div>
                            :   user.sites.map((site) => {
                                    return (
                                            <div key={site}>
                                                {site}
                                            </div>
                                        )
                                    })
                        }
                    </div>

                    <div className={s.PropertyFlexRow}>
                        <div
                            className={s.PropertyIcon}
                            onClick={editMemberSites}
                        >
                            <ICON.EditIcon />
                        </div>
                        <div
                            className={s.PropertyIcon}
                            onClick={removeFromTeam}
                        >
                            <ICON.TrashIcon />
                        </div>
                    </div>

                </div>
            }
        </>
    );
};
