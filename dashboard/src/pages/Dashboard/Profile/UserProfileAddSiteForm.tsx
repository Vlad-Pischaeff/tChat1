import React from 'react';
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from 'store/hook';
import { selectCurrentUser } from 'store/slices/auth';
import { setServicesModal, eModal } from "store/slices/ui";
import { useUpdateUserMutation } from 'store/api/usersApi';
import { withModalBG } from 'components/HOC';
import s from 'pages/Dashboard/Services/Services.module.sass';

type tFormInputs = {
    siteName: string;
}

const UserProfileAddSiteFormTmp = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    const [ updateUser ] = useUpdateUserMutation();
    const { register, resetField, handleSubmit } = useForm<tFormInputs>();

    const onSubmit = (data: tFormInputs) => {
        // ✅ вызываем API '/users', обновляем 'websites'
        const updatedData = { id: user.id, ...data }; // TODO data надо определить
        updateUser(updatedData);
        if (data.siteName) closeModal();
    };

    const closeModal = () => {
        resetField('siteName');
        dispatch(setServicesModal(eModal.none));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
            <div className={s.FormBody}>
                <fieldset>
                    <label>Description</label>
                    <input
                        { ...register("siteName") }
                        className={s.FormInput}
                        placeholder="www.newsite.com" />
                </fieldset>
            </div>
            <div className={s.FormButtons}>
                <input className={s.Button} type="button" value="Close" onClick={closeModal} />
                <input className={s.Button} type="submit" value="Add new site" />
            </div>
        </form>
    );
};

export const UserProfileAddSiteForm = withModalBG(UserProfileAddSiteFormTmp);
