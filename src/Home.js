import React, {useState, useEffect} from 'react'
import {useLocation, useNavigate} from "react-router";
import "./main.css"
import { isMobile } from "react-device-detect";

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

    useEffect(() => {
        if (!location.state) {
            navigate("/welcome")
        } else {
            updateUserSpaces()
        }
        setInterval(updateUserSpaces, 5000)
    }, [])

    const updateUserSpaces = () => {
        fetch("https://cilantroleaf.space/strbk/v1/get-user-spaces", {
            method: "POST",
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: location.state.user
            })
        }).then(res => res.json()).then(data => setUserSpaces(data))
    }

    const changeCreateJoinState = newState => {
        if (newState === "create") {
            generateCode()
        }
        setTimeout(() => setCreateJoinState(newState), createJoinState === "" ? 10 : 300)
        setCreateJoinState("")
    }

    const generateCode = () => {
        const code = (Math.random() + 1).toString(36).substring(6)
        setCreateCodeGenerated(code)
        return code
    }

    const createSpace = () => {
        fetch("https://cilantroleaf.space/strbk/v1/create-space", {
            method: "POST",
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: location.state.user,
                spaceCode: createCodeGenerated,
                spaceName: createSpaceName
            })
        }).then(res => res.json()).then(data => setUserSpaces(data.userSpaces))
    }

    const joinSpace = () => {
        fetch("https://cilantroleaf.space/strbk/v1/join-space", {
            method: "POST",
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: location.state.user,
                spaceCode: joinCodeInput
            })
        }).then(res => res.json()).then(data => {
            setJoinReqStatus(data.response)
            if (data.response === "success") {
                setUserSpaces(data.userSpaces)
            } else {
                setJoinCodeInput("Invalid join code...")
            }
        })
    }

    const handleInputError = () => {
        if (joinReqStatus === "failure") {
            setJoinReqStatus("")
            setJoinCodeInput("")
        }
    }

    const leaveSpace = (spaceObj) => {
        fetch("https://cilantroleaf.space/strbk/v1/leave-space", {
            method: "POST",
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: location.state.user,
                spaceCode: spaceObj.code
            })
        }).then(res => res.json()).then(data => {
            console.log(data)
            setUserSpaces(data.userSpaces)
        })
    }

    const deleteSpace = (spaceObj) => {
        fetch("https://cilantroleaf.space/strbk/v1/delete-space", {
            method: "POST",
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: location.state.user,
                spaceCode: spaceObj.code
            })
        }).then(res => res.json()).then(data => {
            console.log(data)
            setUserSpaces(data.userSpaces)
        })
    }

    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontFamily: "IBM Plex Serif"}}>
            <h1 style={{fontSize: isMobile ? "9vw" : "5rem", fontWeight: "900"}}>———&nbsp;&nbsp;Storybook&nbsp;&nbsp;———</h1>
            <div style={{fontSize: "1.5rem"}}><em style={{fontWeight: "800", marginBottom: "1rem"}}>Hi, {location.state ? location.state.user : ""}!</em>&nbsp;&nbsp;&nbsp;&nbsp;[ <span onMouseEnter={() => setHoveringLogout(true)} onMouseLeave={() => setHoveringLogout(false)} style={{fontWeight: hoveringLogout ? "900" : "300"}} onClick={() => navigate("/welcome")}>logout</span> ]</div>
            <hr style={{width: "95%", color: "#f1f7ed"}}/>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: "1rem", marginLeft: "1rem", marginRight: "1rem"}}>
                <button className="muted-button" style={{marginRight: "2rem", fontSize: "1.5rem", padding: "1rem 1.5rem", borderRadius: "0.5rem"}} onClick={() => changeCreateJoinState("create")}>Create Story Space</button>
                <button className="muted-button" style={{fontSize: "1.5rem", padding: "1rem 1.5rem", borderRadius: "0.5rem"}} onClick={() => changeCreateJoinState("join")}>Join Story Space</button>
            </div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: "2rem", height: createJoinState === "" ? 0 : "5rem", opacity: createJoinState === "" ? 0 : 1, transition: "all 0.5s ease"}}>
                {(createJoinState === "create" && !isMobile) && <>
                    <h4>Join Code: <span style={{fontWeight: "800"}}>{createCodeGenerated}</span></h4>
                    <input style={{width: "15rem", marginLeft: "2rem", color: "#f1f7ed"}} type="text" placeholder="Enter space name..." value={createSpaceName} onChange={e => setCreateSpaceName(e.target.value)}/>
                    <button className="muted-button" style={{marginLeft: "2rem"}} onClick={createSpace}>Create</button>
                </>}
                {(createJoinState === "create" && isMobile) && <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "1rem"}}>
                    <h4>Join Code: <span style={{fontWeight: "800"}}>{createCodeGenerated}</span></h4>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginLeft: "1rem", marginRight: "1rem"}}>
                        <input style={{width: "10rem", color: "#f1f7ed"}} type="text" placeholder="Enter space name..." value={createSpaceName} onChange={e => setCreateSpaceName(e.target.value)}/>
                        <button className="muted-button" style={{marginLeft: "2rem"}} onClick={createSpace}>Create</button>
                    </div>
                </div>}
                {createJoinState === "join" && <>
                    <input style={{width: isMobile ? "10rem" : "15rem", color: joinReqStatus === "failure" ? "#a67070": "#f1f7ed", borderColor: joinReqStatus === "failure" ? "#a67070": "#f1f7ed"}} onMouseEnter={handleInputError} type="text" placeholder="Enter join code..." value={joinCodeInput} onChange={e => setJoinCodeInput(e.target.value)}/>
                    <button className="muted-button" style={{marginLeft: "2rem"}} onClick={joinSpace}>Join</button>
                </>}
            </div>
            <div style={{height: createJoinState === "" ? "5rem" : 0, opacity: createJoinState === "" ? "5rem" : 0, transition: "height 0.5s ease"}}>
                <h4 style={{textAlign: "center"}}><em>Use the options above to enter new spaces.</em></h4>
            </div>
            <hr style={{width: "95%", marginTop: "2rem", color: "#f1f7ed"}}/>
            <h1><strong>Your Spaces</strong></h1>
            {userSpaces.map(spaceObj => { return <>
                { isMobile ?
                    <div style={{backgroundColor: "#665c81", borderRadius: "1rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "1.5rem", marginLeft: "1rem", marginRight: "1rem", padding: "0.5rem"}}>
                        <h4 style={{marginBottom: "0.5rem"}}><strong>{spaceObj.name}</strong>&nbsp;&nbsp;<span style={{fontWeight: "300"}}>(Code: {spaceObj.code})</span></h4>
                        <div style={{backgroundColor: "#a9a9a9", width: "100%", height: "2px", margin: "1.5rem 0 0.5rem 0"}}>&nbsp;</div>
                        <div style={{backgroundColor: "#665c81", borderRadius: "1rem", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "5rem"}}>
                            <p style={{marginLeft: "1rem", marginBottom: "0", textAlign: "center"}}>{spaceObj.storyLength}/40 sentences</p>
                            <div style={{backgroundColor: "#a9a9a9", width: "2px", height: "100%", margin: "0 1rem"}}>&nbsp;</div>
                            <p style={{marginBottom: "0", textAlign: "center"}}>{spaceObj.whoseTurn}'s turn</p>
                            <div style={{backgroundColor: "#a9a9a9", width: "2px", height: "100%", margin: "0 1rem"}}>&nbsp;</div>
                            <button className="muted-button" style={{marginRight: "1rem"}} onClick={() => navigate("/space", {state: {user: location.state.user, data: spaceObj}})}>Enter</button>
                        </div>
                        <div style={{backgroundColor: "#a9a9a9", width: "100%", height: "2px", margin: "0.5rem 0 0rem 0"}}>&nbsp;</div>
                        <div style={{backgroundColor: "#665c81", borderRadius: "1rem", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "5rem"}}>
                            {spaceObj.members.length !== 1 && <button className="muted-button" style={{margin: "0"}} onClick={() => leaveSpace(spaceObj)}>Leave Space</button>}
                            {location.state && location.state.user === spaceObj.owner && <button className="muted-button" style={{marginLeft: "1rem", borderColor: "#ee9a9a", color: "#ee9a9a"}} onClick={() => deleteSpace(spaceObj)}>Delete Space</button>}
                        </div>
                    </div>
                    :
                    <div style={{backgroundColor: "#665c81", borderRadius: "1rem", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "5rem", padding: "0.5rem", marginBottom: "1rem"}}>
                        <h5 style={{marginLeft: "2rem"}}><strong>{spaceObj.name}</strong></h5>
                        <div style={{backgroundColor: "#a9a9a9", width: "2px", height: "100%", margin: "0 2rem"}}>&nbsp;</div>
                        <p style={{marginBottom: "0"}}>Code: {spaceObj.code}</p>
                        <div style={{backgroundColor: "#a9a9a9", width: "2px", height: "100%", margin: "0 2rem"}}>&nbsp;</div>
                        <p style={{marginBottom: "0"}}>{spaceObj.storyLength}/40 sentences</p>
                        <div style={{backgroundColor: "#a9a9a9", width: "2px", height: "100%", margin: "0 2rem"}}>&nbsp;</div>
                        <p style={{marginBottom: "0"}}>{spaceObj.whoseTurn}'s turn</p>
                        <div style={{backgroundColor: "#a9a9a9", width: "2px", height: "100%", margin: "0 2rem"}}>&nbsp;</div>
                        <button className="muted-button" style={{marginRight: "2rem"}} onClick={() => navigate("/space", {state: {user: location.state.user, data: spaceObj}})}>Enter</button>
                        {spaceObj.members.length !== 1 && <button className="muted-button" style={{marginRight: "2rem"}} onClick={() => leaveSpace(spaceObj)}>Leave Space</button>}
                        {location.state && location.state.user === spaceObj.owner && <button className="muted-button" style={{marginRight: "2rem", borderColor: "#ee9a9a", color: "#ee9a9a"}} onClick={() => deleteSpace(spaceObj)}>Delete Space</button>}
                    </div>
                }</>
            })}
        </div>
    )
}