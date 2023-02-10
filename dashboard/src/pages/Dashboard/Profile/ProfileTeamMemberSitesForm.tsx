import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { useUpdateTeamMemberWebsitesMutation } from 'store/api/usersApi';
import { useWebsitesQuery } from 'store/api/websitesApi';
import { setServicesModal, setEditedSite, selectUIEditedMember, eModal } from "store/slices/ui";
import { withModalBG } from 'components/HOC';
import s from 'assets/style/forms.module.sass';
import sl from './Profile.module.sass';

type tFormInputs = {
    sites: string[];
}

const Form = () => {
    const dispatch = useAppDispatch();
    const member = useAppSelector(selectUIEditedMember);
    const [ updWebsites ] = useUpdateTeamMemberWebsitesMutation();
    const { data: sites } = useWebsitesQuery('');
    const { register, resetField, handleSubmit } = useForm<tFormInputs>();

    console.log('form..', sites)

    const onSubmit = async (formData: tFormInputs) => {
        console.log('submit..', formData)
        if (!!member) {
            if (formData.sites.length !== 0) {
                const data = { memberID: member.id, sites: formData.sites }
                updWebsites({ body: data });
            }
            closeModal();
        }
    };

    const closeModal = () => {
        resetField('sites');
        dispatch(setEditedSite(null));
        dispatch(setServicesModal(eModal.none));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
            <div className={s.FormBody}>
                <fieldset>
                    <label>Add/remove observed sites</label>
                    { !!sites && sites.length !== 0
                        ? (
                            sites.map((site, idx) => {
                                return (
                                    <div key={site.id} className={sl.PropertyContainer}>
                                        <p>{site.site}</p>
                                        <div className={sl.CheckboxContainer}>
                                            <input
                                                id={`cb-${idx}`}
                                                type="checkbox"
                                                value={site.id}
                                                { ...register('sites')}
                                            />
                                            <label htmlFor={`cb-${idx}`} className={sl.Checkbox} />
                                        </div>
                                    </div>
                                )
                            })
                        )
                        : (
                            <div>
                                <p>You have no managed web-sites...</p>
                            </div>
                        )
                    }
                </fieldset>
            </div>
            <div className={s.FormButtons}>
                <input className={s.Button} type="button" value="Close" onClick={closeModal} />
                <input className={s.Button} type="submit" value="Update sites" />
            </div>
        </form>
    );
};

export const ProfileTeamMemberSitesForm = withModalBG(Form);
