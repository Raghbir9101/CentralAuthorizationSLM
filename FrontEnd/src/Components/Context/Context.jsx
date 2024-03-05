import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../HTTP";
export const Context = createContext();
function getURL(link) {
    const parsedURL = new URL(link);

    // Get the protocol and hostname to create the base URL
    const baseURL = `${parsedURL.protocol}//${parsedURL.hostname}`;

    return baseURL;
}


export default function ContextProvider({ children }) {
    const currentURL = window.location.href;
    let apiLink = `${getURL(currentURL)}/`;
    const [token, setToken] = useState(sessionStorage.getItem('token') || "");
    const [open, setOpen] = useState(false);
    const [navWidth, setNavWidth] = useState(Cookies.get('navWidth') || "70px");
    const [isAdmin, setIsAdmin] = useState(false);
    const [permissions, setPermissions] = useState({ view: false, edit: false });
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userID, setUserID] = useState("");
    const [loading, setLoading] = useState(false);
    const [tools, setTools] = useState([]);
    const [groups, setGroups] = useState([]);
    function ActivateToast(text, type) {
        if (!type) {
            toast(text, {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "colored",
            });
            return;
        }
        toast[type](text, {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
        });
    }
    async function PostToLogs({ activity, name, email }) {
        // let temp = await axios.post("api/logs", {
        //     name: name || userName,
        //     email: email || userEmail,
        //     activity,
        //     timeStamp: new Date()
        // })
        // return temp
    }
    return (
        <Context.Provider value={{
            ActivateToast,
            apiLink,
            token, setToken,
            open, setOpen,
            navWidth, setNavWidth,
            isAdmin, setIsAdmin,
            permissions, setPermissions,
            userName, setUserName,
            userEmail, setUserEmail,
            userID, setUserID,
            loading, setLoading,
            tools, setTools,
            PostToLogs,
            groups, setGroups
        }}>
            <ToastContainer />
            {children}
        </Context.Provider>
    )
}
