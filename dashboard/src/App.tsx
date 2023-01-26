import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from 'components/router';
import { selectUIMessage } from "store/slices/ui";
import { useAppSelector } from 'store/hook';
import * as PAGE from 'pages';
import * as UI from 'components/ui';

function App() {
    const message = useAppSelector(selectUIMessage);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PAGE.AuthPage />}>
                    <Route index element={<PAGE.LoginPage />} />
                    <Route path="login" element={<PAGE.LoginPage />} />
                    <Route path="signup" element={<PAGE.SignupPage />} />
                    <Route path="restore" element={<PAGE.RestorePage />} />
                    <Route path="setpw/:token" element={<PAGE.PasswordChangePage />} />
                </Route>
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <PAGE.DashboardLayout/>
                        </PrivateRoute>
                    }>
                        <Route path="main" element={<PAGE.MainWorkSpace />} />
                        <Route path="profile" element={<PAGE.UserProfile />} />
                </Route>
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>

            <UI.SnackBar message={message} />

        </BrowserRouter>
    );
}

export default App;
