// Wrapper for a protected route, need an authentication token before accessing the route
import {useContext, useEffect, useState} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants";
import {jwtDecode} from "jwt-decode";
import api from "../api";
import Header from "./Header";
import styled from "styled-components";
import {UserContext} from "../user-content/UserContent";

function ProtectedRoutes() {

    const {setIsLogin} = useContext(UserContext)
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
                console.log("protected route", res.data)
                // cleanup on failed refresh
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(REFRESH_TOKEN);
                setIsLogin(false)
                return false
            }
        } catch (error) {
            console.log("protected route", error)
            // cleanup on failed refresh
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
            setIsLogin(false)
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
    return isAuthorized ?
        <PageContainer>
            <Header />
            <Main>
               <Outlet />
            </Main>

        </PageContainer>
        :
        <Navigate to="/login" replace/>
}

const PageContainer = styled.div``
const Main = styled.main`
    height: 100vh;
    width: 725px;
    margin: 60px auto 0;
    display: flex;
    justify-content: center;
`;

export default ProtectedRoutes