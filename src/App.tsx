import React from 'react';
import { LoginPage } from './pages/LoginPage';

function App() {
    return (
        <>
            <aside className="aside"></aside>
            <section className="layout">
                <header className="header">
                    <p>Header</p>
                </header>
                <article className="content">
                    <LoginPage />
                </article>
                <footer className="footer">
                    <p>Footer</p>
                </footer>
            </section>
        </>
    );
}

export default App;
