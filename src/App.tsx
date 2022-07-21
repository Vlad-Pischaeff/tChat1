import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import * as PAGE from './pages';

function App() {
    return (
        <Routes>
            <Route path="auth" element={<PAGE.AuthPage />}>
                <Route index element={<PAGE.LoginPage />} />
                <Route path="login" element={<PAGE.LoginPage />} />
                <Route path="signup" element={<PAGE.SignupPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
    );
}

export default App;
