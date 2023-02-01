import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { setServicesModal, setEditedImage, selectUIEditedImage, eModal } from "store/slices/ui";
import s from './UserProfile.module.sass';

export const UserProfileChangeImageButton = () => {
    const dispatch = useAppDispatch();
    const imgSrc = useAppSelector(selectUIEditedImage);

    useEffect(() => {
        if (imgSrc) {
            dispatch(setServicesModal(eModal.changeImage));
        }
        // eslint-disable-next-line
    }, [imgSrc])

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                dispatch(setEditedImage(reader.result?.toString() || null))
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
