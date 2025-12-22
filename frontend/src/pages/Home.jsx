import styled from "styled-components";
import ArticleList from "../components/homepage/ArticleList";
import TypingSearchBar from "../components/homepage/TypingSearchBar";
import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../user-content/UserContent";
import ExploreMenu from "../components/homepage/ExploreMenu";


function Home() {
    const { articles, setArticles } = useContext(UserContext)

    const [userText, setUserText] = useState("");
    const [sortOption, setSortOption] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
    const [isFilterFinishedClicked, setFilterFinishedClicked] = useState(false)

    const filterArticles = articles?.filter(article => {
        if (isFilterFinishedClicked) {
            return article.finished
        } else if (userText !== "") {
            return article.title.toLowerCase().includes(userText.toLowerCase())
        } else {
            return article
        }
    }).sort((a, b) => {
            if (sortOption === "A-Z") {
                return a.title.localeCompare(b.title)
            } else if (sortOption === "Z-A") {
                return b.title.localeCompare(a.title)
            } else if (sortOption === "Created Date: New to Old") {
                return b.created_at.localeCompare(a.created_at)
            } else if (sortOption === "Created Date: Old to New") {
                return a.created_at.localeCompare(b.created_at)
            }
    })


    return (
        <HomePageContainer>

            <TypingSearchBar
                userText={userText}
                setUserText={setUserText}
            />

            <ExploreMenu
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                setSortOption={setSortOption}
                sortOption={sortOption}
                isFilterFinishedClicked={isFilterFinishedClicked}
                setFilterFinishedClicked={setFilterFinishedClicked}
            />

            <ArticleList filterArticles={filterArticles}/>

        </HomePageContainer>

    );
}


const HomePageContainer = styled.div`
  min-height: calc(100vh - 120px);
  width: 100%;
  padding-top: 120px;
`

export default Home