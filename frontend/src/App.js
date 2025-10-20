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
    const [currentArticle, setCurrentArticle] = useState(null)

    // ========================== get user ==========================
    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) return;

        async function getUser() {
            try {
                const res = await api.get('/user/', )
                const user = res.data
                setCurrentUser(user)
            } catch (error) {
                setCurrentUser(null);
                console.log(error.response)
            }
        }
        getUser()
    }, [])

    useEffect(() => {
        async function getArticles(){
            try {
                const res = await api.get('/articles/')
                const articles = res.data
                setArticles(articles)
            } catch (error) {
                console.log(error?.response?.data);
            }
        }
        getArticles()
    }, []);


    const userContextValue = {
        currentUser, setCurrentUser, articles, setArticles, currentArticle, setCurrentArticle,
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
