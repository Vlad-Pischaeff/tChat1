import React from 'react';
import * as PAGE from './pages';

function App() {
    return (
        <>
            <aside className="aside"></aside>
            <section className="layout">
                <header className="header">
                    <p>Header</p>
                </header>
                <article className="content">
                    <PAGE.LoginPage />
                </article>
                <footer className="footer">
                    <p>Footer</p>
                </footer>
            </section>
        </>
    );
}

export default App;
