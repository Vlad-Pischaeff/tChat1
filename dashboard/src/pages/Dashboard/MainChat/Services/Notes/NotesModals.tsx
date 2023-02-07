import React from 'react';
import { useAppSelector } from 'store/hook';
import { selectUIServicesModal, eModal } from 'store/slices/ui';
import { NotesAddForm } from './NotesAddForm';
import { NotesEditor } from './NotesEditor';

type eNotesModals = Extract<eModal, eModal.note | eModal.editor>;

const MODAL_FORMS = {
    [eModal.note]:   <NotesAddForm />,
    [eModal.editor]: <NotesEditor />,
}

export const NotesModals = () => {
    const modal = useAppSelector(selectUIServicesModal);

    return (
        <>
            { MODAL_FORMS[modal as eNotesModals] }
        </>
    );
};
