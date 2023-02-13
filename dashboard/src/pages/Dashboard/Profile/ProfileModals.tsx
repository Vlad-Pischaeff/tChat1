import React from 'react';
import { useAppSelector } from 'store/hook';
import { selectUIState, eModal } from 'store/slices/ui';
import { ProfileAddSiteForm } from './ProfileAddSiteForm';
import { ProfileChangeImageForm } from './ProfileChangeImageForm';
import { ProfileChangeAliasForm } from './ProfileChangeAliasForm';
import { ProfileAddTeamMemberForm } from './ProfileAddTeamMemberForm';
import { ProfileTeamMemberSitesForm } from './ProfileTeamMemberSitesForm';

type eProfileModals = Extract<eModal,
        eModal.addSite |
        eModal.changeImage |
        eModal.changeAlias |
        eModal.addMember |
        eModal.editMemberSites
    >;

const MODAL_FORMS = {
    [eModal.addSite]:           <ProfileAddSiteForm />,
    [eModal.changeImage]:       <ProfileChangeImageForm />,
    [eModal.changeAlias]:       <ProfileChangeAliasForm />,
    [eModal.addMember]:         <ProfileAddTeamMemberForm />,
    [eModal.editMemberSites]:   <ProfileTeamMemberSitesForm />
}

export const ProfileModals = () => {
    const modal = useAppSelector(selectUIState('servicesModal'));

    return (
        <>
            { MODAL_FORMS[modal as eProfileModals] }
        </>
    );
};
