import React, { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import { canvasPreview, centerAspectCrop } from './UserProfileUtils';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { selectCurrentUser } from 'store/slices/auth';
import { setServicesModal, setEditedImage, selectUIEditedImage, eModal } from "store/slices/ui";
import { useUpdateUserMutation, useGetUserQuery } from 'store/api/usersApi';
import { withModalBG } from 'components/HOC';
import s from 'pages/Dashboard/Services/Services.module.sass';
import 'react-image-crop/dist/ReactCrop.css';

const ASPECT = 1;
const ROTATE = 0;
const SCALE = 1;

type tFormInputs = {
    editedImage: string;
}

const UserProfileChangeImageFormTmp = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    const imgSrc = useAppSelector(selectUIEditedImage);
    const imgRef = useRef<HTMLImageElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const [ crop, setCrop ] = useState<Crop>();
    const [ completedCrop, setCompletedCrop ] = useState<PixelCrop>();
    // eslint-disable-next-line
    const { data } = useGetUserQuery(user.id, { skip: !user.id });
    // eslint-disable-next-line
    const [ updateUser ] = useUpdateUserMutation();
    // eslint-disable-next-line
    const { setValue, register, resetField, handleSubmit } = useForm<tFormInputs>();

    useEffect(() => {
        if (
            completedCrop?.width &&
            completedCrop?.height &&
            imgRef.current &&
            previewCanvasRef.current
        ) {
            canvasPreview(
                imgRef.current,
                previewCanvasRef.current,
                completedCrop,
                SCALE,
                ROTATE,
            );
        }
    }, [completedCrop]);

    console.log('crop..', completedCrop)

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (ASPECT) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, ASPECT));
        }
    }

    const onSubmit = async (formData: tFormInputs) => {
        // // ✅ вызываем API '/users', обновляем 'image'
        // let websites;
        // const key = randomstring.generate();
        // const site = formData.siteName.trim();
        // const hash = await bcrypt.hashSync(key + site);

        // if (data) {
        //     if (editedSite) {
        //         // ✅ invoke when edit site
        //         const newWebsites = data.websites.filter(item => item.key !== editedSite.key)
        //         websites = [ ...newWebsites, { key, hash, site } ];
        //     } else {
        //         // ✅ invoke when add site
        //         websites = [ ...data.websites, { key, hash, site } ];
        //     }
        // }

        // if (formData.siteName) {
        //     updateUser({ id: user.id, body: { websites }});
        //     closeModal();
        // }
    };

    const closeModal = () => {
        resetField('editedImage');
        dispatch(setEditedImage(null));
        dispatch(setServicesModal(eModal.none));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
            <div className={s.FormBody}>
                { !!imgSrc && (
                    <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={ASPECT}
                    >
                        <img
                            ref={imgRef}
                            alt="Crop me"
                            src={imgSrc}
                            style={{
                                maxWidth: '400px',
                                maxHeight: '300px',
                                transform: `scale(${SCALE}) rotate(${ROTATE}deg)`
                            }}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                )}
            </div>

            <div  className={s.FormBody}>
                { !!completedCrop && (
                    <canvas
                        ref={previewCanvasRef}
                        style={{
                            borderRadius: '8px',
                            objectFit: 'contain',
                            width: '6rem',
                            height: '6rem'
                        }}
                    />
                )}
            </div>

            <div className={s.FormButtons}>
                <input className={s.Button} type="button" value="Close" onClick={closeModal} />
                <input className={s.Button} type="submit" value="Update image" />
            </div>
        </form>
    );
};

export const UserProfileChangeImageForm = withModalBG(UserProfileChangeImageFormTmp);
