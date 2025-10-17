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
        const refresh = localStorage.getItem(REFRESH_TOKEN)

        if (!refresh) return false;

        try {
            // { headers: { Authorization: undefined }
            const res = await api.post('/token/refresh/', {refresh: refresh})
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                return true
            } else {
                // cleanup on failed refresh
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(REFRESH_TOKEN);
                return false
            }
        } catch (error) {
            console.log(error)
            // cleanup on failed refresh
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
            return false
        }
    }

    const auth = async () => {
        // check if token exists & if it needs to be refreshed if expored
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return
        }

        let tokenExpiration = 0;
        try {
          const decoded = jwtDecode(token);
          tokenExpiration = typeof decoded?.exp === "number" ? decoded.exp : 0;
        } catch {
          // token malformed/expired -> try refresh
          const ok = await refreshToken();
          setIsAuthorized(ok);
          return;
        }

        const now = Math.floor(Date.now() / 1000)
        const skew = 10 // second
        if (tokenExpiration <= now + skew) {
            const refreshed =  await refreshToken()
            setIsAuthorized(refreshed)
        } else {
            setIsAuthorized(true)
        }
    }

    if (isAuthorized === null) return <div>Loading...</div>
    return isAuthorized ? children : <Navigate to="/login" replace/>
}

export default ProtectedRoutes