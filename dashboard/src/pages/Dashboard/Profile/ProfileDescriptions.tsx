import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setServicesModal, eModal } from 'store/slices/ui';
import { tUser } from 'store/api/apiTypes';
import * as ICON from 'assets/icons';
import s from './Profile.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    user: tUser
}

export const ProfileDescriptions = ({ user }: iProps) => {
    const dispatch = useAppDispatch();

    const openModalEditAlias = () => {
        dispatch(setServicesModal(eModal.changeAlias));
    }

    return (
        <div role="listbox">
            <ItemDescription title="Name: " desc={user.name} />
            <ItemDescription title="NickName: " desc={user.nickname} />
            <ItemDescription title="E-mail: " desc={user.email} />
            <div className={s.ItemContainer}>
                <ItemDescription title="Alias: " desc={user.alias} />
                <div className={s.ItemIcon} onClick={openModalEditAlias}>
                    <ICON.EditIcon />
                </div>
            </div>
            <div className={s.ItemContainer}>
                <ItemDescription title="Greeting: " desc={user.greeting} />
                <div className={s.ItemIcon} onClick={openModalEditAlias}>
                    <ICON.EditIcon />
                </div>
            </div>
        </div>
    );
};

interface iProp extends React.HTMLAttributes<HTMLDivElement> {
    title: string,
    desc: string
}

const ItemDescription = ({ title, desc }: iProp) => {

    return (
        <div className={s.Item} role="listitem">
            <p className={s.ItemTitle}>{title}</p>
            <p className={s.ItemValue}>{desc}</p>
        </div>
    );
};
