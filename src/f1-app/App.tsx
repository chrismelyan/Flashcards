import React from 'react';
import s from './App.module.css';
import Header from "../f2-ui/header/Header";
import Pages from "../f2-ui/pages/Pages";

function App() {
    return (
        <div className={s.app}>
            <Header/>
            <Pages/>
        </div>
    );
}

export default App;
