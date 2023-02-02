import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setServicesModal, setEditedImage, eModal } from "store/slices/ui";
import s from './UserProfile.module.sass';

export const UserProfileChangeImageButton = () => {
    const dispatch = useAppDispatch();

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            dispatch(setServicesModal(eModal.changeImage));

            const reader = new FileReader();
            reader.onload = () => {
                dispatch(setEditedImage(reader.result?.toString() || ''))
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    return (
        <div className={s.AddItem}>
            <label
                htmlFor="file-input"
                className={s.label}
            >
                change image
            </label>
            <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={onSelectFile}
                style={{ display: 'none' }}
            />
        </div>
    );
};
