import React from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from 'store/hook';
import { selectCurrentUser, IUser, logout } from 'store/slices/auth';
import { useGetUserQuery, useLazyUsersQuery } from 'store/api/usersApi';
import { ChatPageHeader } from './ChatPageHeader';
import s from './Chat.module.sass';

export const ChatPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector<IUser>(selectCurrentUser);
    const { data } = useGetUserQuery(user.id, { skip: !user.id });
    const [ trigger, { isLoading } ] = useLazyUsersQuery();

    const handlerLogout = () => {
        dispatch(logout());
        navigate("/", { replace: true });
    }

    const handlerGetUsers = async () => {
        const data = await trigger('', false);
        if ( data.status === "rejected") {
            handlerLogout();
        }
    }

    return (
        <>
            <aside className="aside"></aside>
            <section className="layout">

                <ChatPageHeader data={data} />

                <article className="content">
                    { isLoading && <div className={s.loader}></div> }
                    { isLoading &&
                        <input type="button" value="Get users" onClick={handlerGetUsers}/>
                    }
                    <Outlet />
                </article>

                <footer className="footer">
                    <p>vlad pischaeff &copy; 2022</p>
                </footer>

            </section>
        </>
    );
};
