import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { selectCurrentUser } from 'store/slices/auth';
import { useAddUserTeamMembersMutation } from 'store/api/usersApi';
import { setServicesModal, eModal } from "store/slices/ui";
import { withModalBG } from 'components/HOC';
import s from 'assets/style/forms.module.sass';

type tFormInputs = {
    member: string;
}

const ProfileAddTeamMemberFormTmp = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    // const { data } = useGetUserQuery(user.id, { skip: !user.id });
    const [ addMember ] = useAddUserTeamMembersMutation();
    const { setFocus, register, resetField, handleSubmit } = useForm<tFormInputs>();

    useEffect(() => {
        setFocus('member', { shouldSelect: false });
        // eslint-disable-next-line
    }, []);

    const onSubmit = async (formData: tFormInputs) => {
        // ✅ вызываем API '/websites', обновляем 'website'
        if (formData.member) {
            addMember({ id: user.id, body: { nickname: formData.member }});
            closeModal();
        }
    };

    const closeModal = () => {
        resetField('member');
        dispatch(setServicesModal(eModal.none));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
            <div className={s.FormBody}>
                <fieldset>
                    <label>add user by his &quot;nickname&quot;</label>
                    <input
                        { ...register("member") }
                        className={s.FormInput}
                        placeholder="enter @nick_name of user..." />
                </fieldset>
            </div>
            <div className={s.FormButtons}>
                <input className={s.Button} type="button" value="Close" onClick={closeModal} />
                <input className={s.Button} type="submit" value="Add new member" />
            </div>
        </form>
    );
};

export const ProfileAddTeamMemberForm = withModalBG(ProfileAddTeamMemberFormTmp);
