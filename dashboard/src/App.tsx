import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from 'components/router';
import * as PAGE from 'pages';

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
                    } />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
