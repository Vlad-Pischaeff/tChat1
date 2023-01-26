import React from 'react';
import { useAppSelector } from 'store/hook';
import { selectUIServicesModal, eModal } from "store/slices/ui";
import { AnswersAddForm } from './AnswersAddForm';
import { AnswersEditor } from './AnswersEditor';

export const AnswersModals = () => {
    const servicesModal = useAppSelector(selectUIServicesModal);

    interface iSymbol{
        [key: string]: JSX.Element
    }

    const MODAL_FORMS: iSymbol = {
        [eModal.answer]: <AnswersAddForm />,
        [eModal.editor]: <AnswersEditor />
    }

    return (
        <>
            { MODAL_FORMS[servicesModal] }
        </>
    );
};
