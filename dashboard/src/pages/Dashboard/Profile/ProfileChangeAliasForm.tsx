import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { selectCurrentUser } from 'store/slices/auth';
import { setServicesModal, eModal } from 'store/slices/ui';
import { useUpdateUserMutation, useGetUserQuery } from 'store/api/usersApi';
import { withModalBG } from 'components/HOC';
import s from 'pages/Dashboard/Services/Services.module.sass';

type tFormInputs = {
    alias: string;
}

const ProfileChangeAliasFormTmp = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    const { data } = useGetUserQuery(user.id, { skip: !user.id });
    const [ updateUser ] = useUpdateUserMutation();
    const { setFocus, setValue, register, resetField, handleSubmit } = useForm<tFormInputs>();

    useEffect(() => {
        !!data && setValue('alias', data.alias);
        setFocus("alias", { shouldSelect: false });
        // eslint-disable-next-line
    }, []);

    const onSubmit = async (formData: tFormInputs) => {
        // ✅ вызываем API '/users', обновляем 'alias'
        const alias = formData.alias.trim();
        updateUser({ id: user.id, body: { alias }});
        closeModal();
    };

    const closeModal = () => {
        resetField('alias');
        dispatch(setServicesModal(eModal.none));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
            <div className={s.FormBody}>
                <fieldset>
                    <label>Alias</label>
                    <input
                        { ...register("alias") }
                        className={s.FormInput}
                        placeholder="add alias..." />
                </fieldset>
            </div>
            <div className={s.FormButtons}>
                <input className={s.Button} type="button" value="Close" onClick={closeModal} />
                <input className={s.Button} type="submit" value="Update alias" />
            </div>
        </form>
    );
};

export const ProfileChangeAliasForm = withModalBG(ProfileChangeAliasFormTmp);
