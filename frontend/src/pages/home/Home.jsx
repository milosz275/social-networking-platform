import React from "react"
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../functions/GetCookie";
import { PostData } from "../../functions/PostData";
import { setCookie } from "../../functions/SetCookie";
import { FilterResponse } from "../../functions/FilterResponse";
import { DeleteAllCookies } from "../../functions/DeleteAllCookies";
import clearSelection from "../../functions/ClearSelection";
import './Home.css';

const Home = (props) => {
    const { loggedIn, email } = props
    const navigate = useNavigate();

    const onButtonClick = () => {
        if (loggedIn) {
            props.setLoggedIn(false)
            DeleteAllCookies()
            navigate("/")
            return
        }
        navigate("/login")
    }

    const onEnterClick=(event)=> {
        if (event.key === "Enter") {
            clearSelection()
            onButtonClick()
        }
    }

    const onTermsButtonClick = () => {
        navigate("/terms")
    }

    const onTestButtonClick = async () => {
        const csrftoken = getCookie("csrftoken");
        console.log("csrftoken: ", csrftoken);
        const refresh = getCookie("refresh");
        console.log("refresh token: ", refresh);
    }

    const onRefreshButtonClick = async () => {
        var response = null;
        const refresh = getCookie("refresh");
        if (!refresh) {
            console.log("Refresh token empty")
            return
        }
        try {
            response = await PostData("http://localhost:8000/user/login/refresh/", JSON.stringify({
                refresh: refresh
            }))
        }
        catch (error) {
            console.log("Error awaiting post: ", error);
        }

        if (response) {
            console.log(response)
            if (response.ok) {
                console.log("Successful refresh")
                const responseResults = await FilterResponse(response, ["access"]);
                const csrftoken = responseResults[0];

                if (csrftoken) {
                    setCookie("csrftoken", csrftoken)
                    console.log("New access set")
                    return
                }
                else {
                    console.log("New access token missing")
                    return
                }
            }
            else {
                console.log("Unsuccessful refresh")
            }
        }
        else {
            console.log("Server not responding")
            return
        }
    }

    return <div className={"Home"}>
        <div className="backgroundContainer">
            <div className="mainContainer">
                <div className={"titleContainer"}>
                    <h1>Welcome to ziomki.tk!</h1>
                </div>
                <div className={"subtitleContainer"}>
                    Hi Ziomkis! 👋
                </div>
                <div className={"buttonContainer"}>
                    <input
                        className={"inputButton"}
                        type="button"
                        onClick={onButtonClick}
                        onKeyDown={(e) => onEnterClick(e) }
                        value={loggedIn ? "Log out" : "Begin now!"} />
                    <input
                        className={"debugButton"}
                        type="button"
                        onClick={onTestButtonClick}
                        value={"Log token"} />
                    <input
                        className={"debugButton"}
                        type="button"
                        onClick={onRefreshButtonClick}
                        value={"Refresh token"} />
                    {(loggedIn ? <div className={"emailContainer"}>
                        Your email address is {email}
                    </div> : <div/>)}
                </div>
                <div className={"inputContainerTerms"} tabIndex="0" onClick={onTermsButtonClick}>
                    By continuing you agree to terms and conditions
                </div>
            </div>
        </div>
    </div>
};

export default Home;
