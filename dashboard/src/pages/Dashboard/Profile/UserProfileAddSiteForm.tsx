import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import bcrypt from 'bcryptjs-react';
import randomstring from 'randomstring';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { selectCurrentUser } from 'store/slices/auth';
import { setServicesModal, setEditedSite, selectUIEditedSite, eModal } from "store/slices/ui";
import { useUpdateUserMutation, useGetUserQuery } from 'store/api/usersApi';
import { withModalBG } from 'components/HOC';
import s from 'pages/Dashboard/Services/Services.module.sass';

type tFormInputs = {
    siteName: string;
}

const UserProfileAddSiteFormTmp = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    const editedSite = useAppSelector(selectUIEditedSite);
    const { data } = useGetUserQuery(user.id, { skip: !user.id });
    const [ updateUser ] = useUpdateUserMutation();
    const { setValue, register, resetField, handleSubmit } = useForm<tFormInputs>();

    useEffect(() => {
        // ✅ invoke when editing site
        if (editedSite) {
            setValue('siteName', editedSite.site);
        }
        // eslint-disable-next-line
    }, [editedSite]);

    const onSubmit = async (formData: tFormInputs) => {
        // ✅ вызываем API '/users', обновляем 'websites'
        let websites;
        const key = randomstring.generate();
        const site = formData.siteName.trim();
        const hash = await bcrypt.hashSync(key + site);

        if (data) {
            if (editedSite) {
                // ✅ invoke when edit site
                const newWebsites = data.websites.filter(item => item.key !== editedSite.key)
                websites = [ ...newWebsites, { key, hash, site } ];
            } else {
                // ✅ invoke when add site
                websites = [ ...data.websites, { key, hash, site } ];
            }
        }

        if (formData.siteName) {
            updateUser({ id: user.id, body: { websites }});
            closeModal();
        }
    };

    const closeModal = () => {
        resetField('siteName');
        dispatch(setEditedSite(null));
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
                <input className={s.Button} type="submit" value={editedSite ? "Update site" : "Add new site"} />
            </div>
        </form>
    );
};

export const UserProfileAddSiteForm = withModalBG(UserProfileAddSiteFormTmp);
