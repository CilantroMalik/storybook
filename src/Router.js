import React, {useEffect} from 'react'
import { Route, Routes } from 'react-router-dom';
import { Home } from './Home'
import { Welcome } from "./Welcome";
import { Space } from "./Space";
import "./main.css"

function Router() {

    useEffect(() => {

    }, [])

    return (
        <Routes>
            <Route path="/welcome" element={<Welcome />}/>
            <Route path="/" element={<Home />}/>
            <Route path="/space" element={<Space />}/>
        </Routes>
    )
}

export default Router