import React from 'react';
import { useForm } from "react-hook-form";
import bcrypt from 'bcryptjs-react';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { selectCurrentUser } from 'store/slices/auth';
import { setServicesModal, eModal } from "store/slices/ui";
import { useUpdateUserMutation, useGetUserQuery } from 'store/api/usersApi';
import { withModalBG } from 'components/HOC';
import s from 'pages/Dashboard/Services/Services.module.sass';

type tFormInputs = {
    siteName: string;
}

const UserProfileAddSiteFormTmp = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    const { data } = useGetUserQuery(user.id, { skip: !user.id });
    const [ updateUser ] = useUpdateUserMutation();
    const { register, resetField, handleSubmit } = useForm<tFormInputs>();

    const onSubmit = async (formData: tFormInputs) => {
        // ✅ вызываем API '/users', обновляем 'websites'
        let websites;
        const key = uuidv4();
        const hash = await bcrypt.hashSync(key);
        const site = formData.siteName.trim();

        if (data) {
            websites = [ ...data.websites, { key, hash, site } ];
        }

        updateUser({ id: user.id, body: { websites }});
        if (formData.siteName) closeModal();
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
