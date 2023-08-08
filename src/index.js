import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import {BrowserRouter} from "react-router-dom";
import './main.css'

const root = ReactDOM.createRoot(
    document.getElementById('root')
)
root.render(
    <React.StrictMode>
        <BrowserRouter basename="/storybook">
            <Router />
        </BrowserRouter>
    </React.StrictMode>
);
