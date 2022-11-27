import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from 'components/router';
import * as PAGE from 'pages';
import * as UI from 'components/ui';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PAGE.AuthPage />}>
                    <Route index element={<PAGE.LoginPage />} />
                    <Route path="login" element={<PAGE.LoginPage />} />
                    <Route path="signup" element={<PAGE.SignupPage />} />
                </Route>
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <PAGE.ChatPage/>
                        </PrivateRoute>
                    }>
                        <Route path="todos" element={<PAGE.TodosPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
            <UI.SnackBar />
        </BrowserRouter>
    );
}

export default App;
