// Wrapper for a protected route, need an authentication token before accessing the route
import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants";
import {jwtDecode} from "jwt-decode";
import api from "../api";

function ProtectedRoutes({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, []);

    const refreshToken = async () => {
        // refresh the access  token automatically
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post('/token/refresh/', {
                refresh: refreshToken
            })
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }

    const auth = async () => {
        // check if token exists & if it needs to be refreshed if expored
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        if (tokenExpiration < now) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoutes