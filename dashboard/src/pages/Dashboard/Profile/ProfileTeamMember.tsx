import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setServicesModal, setEditedMember, eModal } from 'store/slices/ui';
import { useGetUserQuery, useRemoveUserTeamMembersMutation } from 'store/api/usersApi';
import { useWebsitesQuery } from 'store/api/websitesApi';
import { tMember } from 'store/api/apiTypes';
import * as ICON from 'assets/icons';
import s from './Profile.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    user: tMember
}

export const ProfileTeamMember = ({ user }: iProps ) => {
    const dispatch = useAppDispatch();
    const { data: sites } = useWebsitesQuery('');
    const { data: member } = useGetUserQuery(user.member, { skip: !user.member });
    const [ removeUser ] = useRemoveUserTeamMembersMutation();

    const editMemberSites = () => {
        !!member && dispatch(setEditedMember(member));
        dispatch(setServicesModal(eModal.editMemberSites));
    }

    const removeFromTeam = () => {
        if (member) {
            removeUser({ body: { memberID: member.id }});
        }
    }

    const isInList = (id: string) => {
        return (user.sites as string[]).includes(id);
    }

    const SITES = sites?.filter((site) => isInList(site.id));

    return (
        <>
            { !!member &&
                <div className={s.PropertyContainer} style={{ 'padding': '8px' }}>
                    <div className={`${s.PropertyFlexRow} ${s.flex11}`}>
                        <img
                            className={s.PropertyMemberIcon}
                            src={member.image}
                            alt="avatar" />

                        <div>
                            <div className={s.PropertySite}>{member.name}</div>
                            <div className={s.PropertyTitle}>{member.email}</div>
                            <div className={s.PropertyTitle}>{member.alias}</div>
                        </div>
                    </div>

                    <div className={s.PropertyHash} role="listbox">
                        { !!SITES && (
                            SITES.length === 0
                                ?   <div className={s.PropertyTitle}>
                                        <p>No observed sites...</p>
                                    </div>
                                :   SITES.map((site) => (
                                        <div key={site.id} role="listitem">
                                            {site.site}
                                        </div>
                                    ))
                        )}
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
