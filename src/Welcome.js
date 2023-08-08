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
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: "2.5rem"}}>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "2px solid #f1f7ed", borderRadius: "1rem", marginRight: "4rem", padding: "1.5rem 4rem"}}>
                    <h4 style={{marginTop: 0}}>Register</h4>
                    <p style={{marginBottom: "2rem"}}>{registerFeedback === "failure" ? <em style={{color: "#a67070"}}>This username already exists — please use a different one.</em> : <em>If it's your first time here, welcome to the Storybook :)</em>}</p>
                    <input type="text" placeholder="Enter username..." value={regUsername} onChange={e => setRegUsername(e.target.value)} style={{marginBottom: "1rem", maxWidth: "15rem", color: "#f1f7ed"}}/>
                    <input type="text" placeholder="Enter password..." value={regPassword} onChange={e => setRegPassword(e.target.value)} style={{maxWidth: "15rem", color: "#f1f7ed"}}/>
                    <button className="muted-button" style={{marginTop: "1.5rem"}} onClick={register}>Go</button>
                </div>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "2px solid #f1f7ed", borderRadius: "1rem", padding: "1.5rem 4rem"}}>
                    <h4 style={{marginTop: 0}}>Login</h4>
                    <p style={{marginBottom: "2rem"}}>{loginFeedback === "failure" ? <em style={{color: "#a67070"}}>That username/password combo doesn't exist — please try again.</em> : <em>If you've been here before, it's nice to see you again!</em>}</p>
                    <input type="text" placeholder="Enter username..." value={logUsername} onChange={e => setLogUsername(e.target.value)} style={{marginBottom: "1rem", maxWidth: "15rem", color: "#f1f7ed"}}/>
                    <input type="text" placeholder="Enter password..." value={logPassword} onChange={e => setLogPassword(e.target.value)} style={{maxWidth: "15rem", color: "#f1f7ed"}}/>
                    <button className="muted-button" style={{marginTop: "1.5rem"}} onClick={login}>Go</button>
                </div>
            </div>
        </div>
    )
}