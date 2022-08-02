import React from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { selectCurrentUser, IUser, logout } from '../../store/slices/auth';
import { useGetUserQuery, useLazyUsersQuery } from '../../store/api/usersApi';
import s from './Chat.module.sass';

export const ChatPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector<IUser>(selectCurrentUser);
    const { data } = useGetUserQuery(user.id, { skip: !user.id });
    const [ trigger, { isLoading } ] = useLazyUsersQuery();
    const query = useLazyUsersQuery();

    console.log('ChatPage..data..', data, user.id, query);
    
    const handlerLogout = () => {
        dispatch(logout());
        navigate("/", { replace: true });
    }

    const handlerGetUsers = async () => {
        const data = await trigger('', false);
        if ( data.status === "rejected") {
            navigate("/logout", { replace: true });
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

                    <div>
                        <p onClick={handlerLogout}><Link to="">Logout</Link></p>
                    </div>
                </nav>
                <article className="content">
                    { isLoading && <div className={s.loader}></div> }
                    <input type="button" value="Get users" onClick={handlerGetUsers}/>
                    <Outlet />
                </article>
                <footer className="footer">
                    <p>vlad pischaeff &copy; 2022</p>
                </footer>
            </section>
        </>
    );
};