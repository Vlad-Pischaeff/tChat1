import React from 'react';
import { useAppSelector } from 'store/hook';
import { useGetUserQuery } from 'store/api/usersApi';
import { selectCurrentUser } from 'store/slices/auth';
import { UserProfileDescriptions } from './UserProfileDescriptions';
import { UserProfileImage } from './UserProfileImage';
import { UserProfileChangeImageButton} from './UserProfileChangeImageButton';
import { UserProfileWebsites } from './UserProfileWebsites';
import { UserProfileModals } from './UserProfileModals';
import s from './UserProfile.module.sass';

export const UserProfile = () => {
    const user = useAppSelector(selectCurrentUser);
    const { data } = useGetUserQuery(user.id, { skip: !user.id });

    return (
        <div className={s.Container}>

            <UserProfileModals />

            { data &&
                <>
                    <div className={s.LeftSubContainer}>
                        <div style={{ width: '100%' }}>
                            <UserProfileImage user={data} />

                            <UserProfileDescriptions user={data} />
                        </div>

                        <UserProfileChangeImageButton />
                    </div>

                    <div className={s.RightSubContainer}>
                        <UserProfileWebsites user={data} />
                    </div>
                </>
            }
        </div>
    );
};
