import react, {useEffect, useState} from "react"
import {Routes, Route, Navigate} from "react-router-dom";
import {Provider} from "react-redux";
import {UserContext} from "./user-content/UserContent";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import {ACCESS_TOKEN} from "./constants";
import api from "./api";
import Article from "./pages/Article";

function Logout() {
  localStorage.clear()
  return <Navigate to='/login' />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
    const [currentUser, setCurrentUser] = useState(null)
    const [articles, setArticles] = useState(null)
    const [wordTypes, setWordTypes] = useState(null)

    const [currentArticle, setCurrentArticle] = useState(null)

    // ========================== set "isLogin" localStorage =========================
    // stays at this top level, stop infinitive loop of fetching users/articles when logout
    const storeIsLogin = localStorage.getItem("isLogin") === "true"
    const [isLogin, setIsLogin] = useState(storeIsLogin)
    useEffect(() => {
        localStorage.setItem("isLogin", isLogin)
    }, [isLogin]);

    // ========================== get user ==========================
    useEffect(() => {
        if (isLogin) {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) return;

            async function getUser() {
                try {
                    const res = await api.get('/user/', )
                    const user = res.data
                    setCurrentUser(user)
                } catch (error) {
                    setCurrentUser(null);
                    console.log("failed to get user",  error.response.data)
                }
            }
            getUser()
        }

    }, [])

    useEffect(() => {
        if (isLogin) {
            async function getArticles(){
                try {
                    const res = await api.get('/articles/')
                    const articles = res.data
                    setArticles(articles)
                } catch (error) {
                    console.log("failed to get articles", error?.response?.data);
                }
            }
            getArticles()
        }
    }, []);

    useEffect(() => {
        if (isLogin) {
            async function getWordTypes() {
                try {
                    const res = await api.get('/word_types/')
                    const types = res.data
                    setWordTypes(types)
                } catch (error) {
                    console.log("failed to get word types", error?.response?.data);
                }
            }
            getWordTypes()
        }
    }, [isLogin])


    // console.log(isLogin, localStorage.getItem("isLogin"))
    const userContextValue = {
        isLogin,setIsLogin,
        currentUser, setCurrentUser, articles, setArticles, currentArticle, setCurrentArticle,
        wordTypes
    }


    return (
        <UserContext.Provider value={userContextValue}>
        <Routes>
            <Route exact path="*" element={<NotFound />}/>
            <Route exact path="/register" element={<Register />}/>
            <Route exact path="/login" element={<Login />}/>

            <Route element={<ProtectedRoutes/>}>
                 <Route exact path="/" element={<Home />}/>
                 <Route exact path='/article/:article_title/:article_id' element={<Article />} />
            </Route>

        </Routes>
        </UserContext.Provider>

    );
}

export default App;
