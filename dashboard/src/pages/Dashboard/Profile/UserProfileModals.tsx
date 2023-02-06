import React from 'react';
import { useAppSelector } from 'store/hook';
import { selectUIServicesModal, eModal } from 'store/slices/ui';
import { UserProfileAddSiteForm } from './UserProfileAddSiteForm';
import { UserProfileChangeImageForm } from './UserProfileChangeImageForm';
import { UserProfileChangeAliasForm } from './UserProfileChangeAliasForm';

type eProfileModals = Extract<eModal, eModal.addSite | eModal.changeImage| eModal.changeAlias >;

const MODAL_FORMS = {
    [eModal.addSite]:     <UserProfileAddSiteForm />,
    [eModal.changeImage]: <UserProfileChangeImageForm />,
    [eModal.changeAlias]: <UserProfileChangeAliasForm />
}

export const UserProfileModals = () => {
    const modal = useAppSelector(selectUIServicesModal);

    return (
        <>
            { MODAL_FORMS[modal as eProfileModals] }
        </>
    );
};
