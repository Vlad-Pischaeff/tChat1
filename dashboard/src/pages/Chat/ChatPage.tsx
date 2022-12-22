import React from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from 'store/hook';
import { logout } from 'store/slices/auth';
import { useLazyUsersQuery } from 'store/api/usersApi';
import * as UI from 'components/ui';
import s from './Chat.module.sass';

export const ChatPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
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

                <UI.Header />

                <article className="content">
                    { isLoading && <div className={s.loader}></div> }
                    { isLoading &&
                        <input type="button" value="Get users" onClick={handlerGetUsers}/>
                    }
                    <Outlet />
                </article>

                <UI.Footer />

            </section>
        </>
    );
};
