import React, { useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from 'store/hook';
import { selectCurrentUser } from 'store/slices/auth';
import * as UI from 'components/ui';

export const AuthPage = () => {
    const navigate = useNavigate();
    const user = useAppSelector(selectCurrentUser);

    useEffect(() => {
        user.id &&
            navigate("/dashboard/todos", { replace: true });
    }, [user.id, navigate]);

    return (
        <>
            <aside className="aside"></aside>
            <section className="layout">

                <UI.Header />

                <article className="content">
                    <Outlet />
                </article>

                <UI.Footer />

            </section>
        </>
    );
};
