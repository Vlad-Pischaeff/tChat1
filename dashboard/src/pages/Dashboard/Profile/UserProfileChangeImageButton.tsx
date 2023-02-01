import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import ReactCrop, {
    // centerCrop,
    // makeAspectCrop,
    Crop,
    // PixelCrop,
} from 'react-image-crop';
import { useAppSelector, useAppDispatch } from 'store/hook';
// import { useGetUserQuery } from 'store/api/usersApi';
// import { selectCurrentUser } from 'store/slices/auth';
import { setServicesModal, setEditedImage, selectUIEditedImage, eModal } from "store/slices/ui";
import s from './UserProfile.module.sass';

export const UserProfileChangeImageButton = () => {
    const dispatch = useAppDispatch();
    const imgSrc = useAppSelector(selectUIEditedImage);
    // const { data } = useGetUserQuery(user.id, { skip: !user.id });
    const [ crop, setCrop ] = useState<Crop>();
    // const [ imgSrc, setImgSrc ] = useState('');

    useEffect(() => {
        if (imgSrc) {
            dispatch(setServicesModal(eModal.changeImage));
        }
        // eslint-disable-next-line
    }, [imgSrc])

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined);     // Makes crop preview update between images.
            const reader = new FileReader();
            reader.onload = () => {
                dispatch(setEditedImage(reader.result?.toString() || null))
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    console.log('image...', imgSrc, crop)

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
