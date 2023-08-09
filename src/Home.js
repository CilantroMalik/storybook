import React, {useState, useEffect} from 'react'
import {useLocation, useNavigate} from "react-router";
import "./main.css"
import {hash} from "./utils";

export const Home = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const [createJoinState, setCreateJoinState] = useState("")
    const [createCodeGenerated, setCreateCodeGenerated] = useState("")
    const [createSpaceName, setCreateSpaceName] = useState("")
    const [joinCodeInput, setJoinCodeInput] = useState("")
    const [joinReqStatus, setJoinReqStatus] = useState("")
    const [userSpaces, setUserSpaces] = useState([])
    const [hoveringLogout, setHoveringLogout] = useState(false)
    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontFamily: "IBM Plex Serif"}}>
            <h1 style={{fontSize: "5rem", fontWeight: "900"}}>———&nbsp;&nbsp;Storybook&nbsp;&nbsp;———</h1>
            <div style={{fontSize: "1.5rem"}}><em style={{fontWeight: "800", marginBottom: "1rem"}}>Hi, {location.state ? location.state.user : ""}!</em>&nbsp;&nbsp;&nbsp;&nbsp;[ <span onMouseEnter={() => setHoveringLogout(true)} onMouseLeave={() => setHoveringLogout(false)} style={{fontWeight: hoveringLogout ? "900" : "300"}} onClick={() => navigate("/welcome")}>logout</span> ]</div>
            <hr style={{width: "95%", color: "#f1f7ed"}}/>
        </div>
    )
}