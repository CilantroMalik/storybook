import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router";
import {hash} from "./utils";
import "./main.css"

export const Welcome = () => {

    const navigate = useNavigate()

    const [regUsername, setRegUsername] = useState("")
    const [regPassword, setRegPassword] = useState("")
    const [logUsername, setLogUsername] = useState("")
    const [logPassword, setLogPassword] = useState("")
    const [registerFeedback, setRegisterFeedback] = useState("")
    const [loginFeedback, setLoginFeedback] = useState("")

    const register = () => {
    }

    const login = () => {
    }

    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontFamily: "IBM Plex Serif"}}>
            <h1 style={{fontSize: "5rem", fontWeight: "900"}}>———&nbsp;&nbsp;Storybook&nbsp;&nbsp;———</h1>
            <hr style={{width: "95%", color: "#f1f7ed"}}/>
            </div>
        </div>
    )
}