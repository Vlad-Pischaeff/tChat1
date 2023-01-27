import React from 'react';
import { useAppSelector } from 'store/hook';
import { useGetUserQuery } from 'store/api/usersApi';
import { selectCurrentUser } from 'store/slices/auth';
import { UserProfileImage } from './UserProfileImage';
import * as ICON from 'assets/icons';
import s from './UserProfile.module.sass';

export const UserProfile = () => {
    const user = useAppSelector(selectCurrentUser);
    const { data } = useGetUserQuery(user.id, { skip: !user.id });

    return (
        <div className={s.Container}>
            <div className={s.SubContainer}>
                { data &&
                    <>
                        <UserProfileImage user={data} />
                        <input
                            type="button"
                            className={s.AddItem}
                            value="load image"
                        />
                        <hr/>
                        <div className={s.Item}>
                            <p className={s.ItemTitle}>Name: </p>
                            <p className={s.ItemValue}>{data.name}</p>
                        </div>
                        <div className={s.Item}>
                            <p className={s.ItemTitle}>E-mail: </p>
                            <p className={s.ItemValue}>{data.email}</p>
                        </div>
                        <hr/>
                        <div className={s.Item}>
                            <p className={s.ItemTitle}>Web-sites: </p>
                            <div className={s.ItemContainer} role="listbox">
                                { data.websites.length === 0
                                    ? <div className={s.ItemNoValue}>No managed sites...</div>
                                    : <>
                                        { data.websites.map(item => {
                                            return <div
                                                        role="listitem"
                                                        key={item.hash}
                                                        className={s.PropertyContainer}
                                                    >
                                                        <p className={s.PropertySite}>{item.site}</p>
                                                        <p className={s.ItemTitle}>hash:</p>
                                                        <p className={s.PropertyHash}>{item.hash}</p>
                                                        <div className={s.PropertyIcon}>
                                                            <ICON.EditIcon />
                                                        </div>
                                                        <div className={s.PropertyIcon}>
                                                            <ICON.TrashIcon />
                                                        </div>
                                                    </div>
                                            })
                                        }
                                    </>
                                }
                            </div>
                        </div>

                        <input
                            type="button"
                            className={s.AddItem}
                            value="+ add site"
                        />
                    </>
                }
            </div>
        </div>
    );
};
