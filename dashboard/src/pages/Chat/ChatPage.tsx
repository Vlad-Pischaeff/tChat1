import React from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from 'store/hook';
import { selectCurrentUser, IUser, logout } from 'store/slices/auth';
import { selectUI, setTheme, UIType } from 'store/slices/ui';
import { useGetUserQuery, useLazyUsersQuery } from 'store/api/usersApi';
import { changeTheme } from 'assets/style/utils';
import s from './Chat.module.sass';

export const ChatPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector<IUser>(selectCurrentUser);
    const ui = useAppSelector<UIType>(selectUI);
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

    const handlerColors = () => {
        if (ui.theme === 'dark') {
            changeTheme('light');
            dispatch(setTheme('light'));
        } else {
            changeTheme('dark');
            dispatch(setTheme('dark'));
        }
    }

    return (
        <>
            <aside className="aside"></aside>
            <section className="layout">
                <nav className="header">
                    <div>
                        { data &&
                            <>
                                <img src={data.photo} alt="avatar" />
                                <p>{data.name}</p>
                            </>
                        }
                    </div>

                    <div className={s.flexContainer}>
                        <div>
                            <p onClick={handlerColors}>Theme</p>
                        </div>
                        <div>
                            <p onClick={handlerLogout}><Link to="">Logout</Link></p>
                        </div>
                    </div>
                </nav>
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
