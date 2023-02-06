import React from 'react';
import { useAppSelector } from 'store/hook';
import { selectUIServicesModal, eModal } from 'store/slices/ui';
import { ProfileAddSiteForm } from './ProfileAddSiteForm';
import { ProfileChangeImageForm } from './ProfileChangeImageForm';
import { ProfileChangeAliasForm } from './ProfileChangeAliasForm';

type eProfileModals = Extract<eModal, eModal.addSite | eModal.changeImage| eModal.changeAlias >;

const MODAL_FORMS = {
    [eModal.addSite]:     <ProfileAddSiteForm />,
    [eModal.changeImage]: <ProfileChangeImageForm />,
    [eModal.changeAlias]: <ProfileChangeAliasForm />
}

export const ProfileModals = () => {
    const modal = useAppSelector(selectUIServicesModal);

    return (
        <>
            { MODAL_FORMS[modal as eProfileModals] }
        </>
    );
};
