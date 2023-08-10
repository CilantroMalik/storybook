import React, {useState, useEffect} from 'react'
import {useNavigate, useLocation} from "react-router";
import "./main.css"

export const Space = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const [spaceData, setSpaceData] = useState({name: "Loading...", code: "loading...", story: "Story loading...", storyLength: 0, members: [], whoseTurn: "?"})
    const [sentence, setSentence] = useState("")
    const [hoveringLogout, setHoveringLogout] = useState(false)
    const [hoveringReturn, setHoveringReturn] = useState(false)

    useEffect(() => {
        if (!location.state) {
            navigate("/")
        } else {
            setSpaceData(location.state.data)
        }
    }, [])

    const addSentence = () => {
    }

    const refresh = () => {
    }

    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontFamily: "IBM Plex Serif"}}>
            <h1 style={{fontSize: "5rem", fontWeight: "900"}}>———&nbsp;&nbsp;Storybook&nbsp;&nbsp;———</h1>
            <div style={{fontSize: "1.5rem"}}><em style={{fontWeight: "800", marginBottom: "1rem"}}>Hi, {location.state ? location.state.user : ""}!</em>&nbsp;&nbsp;&nbsp;&nbsp;[ <span onMouseEnter={() => setHoveringLogout(true)} onMouseLeave={() => setHoveringLogout(false)} style={{fontWeight: hoveringLogout ? "900" : "300"}} onClick={() => navigate("/welcome")}>logout</span> ]</div>
            <hr style={{width: "95%", color: "#f1f7ed"}}/>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}><h1><strong>Current space: {spaceData.name} (Join code {spaceData.code})</strong></h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h2 style={{margin: "1rem 0", fontWeight: "300"}}>[ <span onMouseEnter={() => setHoveringReturn(true)} onMouseLeave={() => setHoveringReturn(false)} style={{fontWeight: hoveringReturn ? "900" : "300"}} onClick={() => navigate("/", {state: {user: location.state.user}})}>return home</span> ]</h2></div>
            <h4><em>{spaceData.storyLength !== 40 ? <>Story in progress... it's {spaceData.whoseTurn}'s turn.</> : <>Story complete!</>}</em>&nbsp; &nbsp; [ <span style={{color: "#ffffff"}} onClick={refresh}><u>refresh</u></span> ]</h4>
            <p style={{minHeight: "10rem", width: "75%", border: "2px solid #f1f7ed", borderRadius: "1.5rem", padding: "1rem", margin: "1.5rem 0"}}>{spaceData.story === "" ? <em style={{opacity: "0.5"}}>This story is yet to be written...</em> : <>{spaceData.story}</>}</p>
            {location.state && spaceData.whoseTurn === location.state.user ?
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "1rem", width: "50%"}}>
                    <textarea placeholder="Add a sentence here. Be thoughtful, but spontaneous :)" style={{width: "100%", color: "#f1f7ed", marginBottom: "1rem"}} value={sentence} onChange={e => setSentence(e.target.value)}/>
                    <button className="muted-button" onClick={addSentence}>Submit</button>
                </div>
                :
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <em>It's not your turn to add a sentence yet... you'll go again after your space-mates add to the story.</em>
                </div>
            }
        </div>
    )

}