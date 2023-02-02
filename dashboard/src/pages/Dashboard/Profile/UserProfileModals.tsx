import React from 'react';
import { useAppSelector } from 'store/hook';
import { selectUIServicesModal, eModal } from "store/slices/ui";
import { UserProfileAddSiteForm } from './UserProfileAddSiteForm';
import { UserProfileChangeImageForm } from './UserProfileChangeImageForm';

type eProfileModals = Extract<eModal, eModal.addSite | eModal.changeImage >;

const MODAL_FORMS = {
    [eModal.addSite]:     <UserProfileAddSiteForm />,
    [eModal.changeImage]: <UserProfileChangeImageForm />
}

export const UserProfileModals = () => {
    const modal = useAppSelector(selectUIServicesModal);

    return (
        <>
            { MODAL_FORMS[modal as eProfileModals] }
        </>
    );
};
