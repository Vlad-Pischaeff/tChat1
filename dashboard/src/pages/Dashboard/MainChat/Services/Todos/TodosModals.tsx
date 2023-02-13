import React from 'react';
import { useAppSelector } from 'store/hook';
import { selectUIServicesModal, eModal } from 'store/slices/ui';
import { TodosAddForm } from './TodosAddForm';

type eTodosModals = Extract<eModal, eModal.todo>;

const MODAL_FORMS = {
    [eModal.todo]:   <TodosAddForm />,

}

export const TodosModals = () => {
    const modal = useAppSelector(selectUIServicesModal);

    return (
        <>
            { MODAL_FORMS[modal as eTodosModals] }
        </>
    );
};
