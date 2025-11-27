import {useParams} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import api from "../api";
import {UserContext} from "../user-content/UserContent";
import styled from "styled-components";
import ArticleReadingArea from "../components/ArticleReadingArea";
import {splitText} from "../utils/splitText";
import {calculatePages} from "../utils/calculatePages";
import DictionaryArea from "../components/DictionaryArea";

function Article() {

    const { article_title, article_id } = useParams()
    const {currentArticle, setCurrentArticle} = useContext(UserContext)

    const [isLoading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [sentence, setSentence] = useState(null)

    const [clickedWord, setClickedWord] = useState(null)
    const [clickedWordIndex, setClickedWordIndex] = useState(null)

    const [ipa, setIpa] = useState(null)
    const [dictionaryWords, setDictionaryWords] = useState(null)
    const [wordNotFound, setNotFound] = useState(null)

    const [totalWords, setTotalWords] = useState(0)
    const [finishReading, setFinishReading] = useState(null)
    const [lastClick, setLastClick] = useState(null)

    const [isShowNewMeaningForm, setShowNewMeaningForm] = useState(false)



    useEffect(() => {
        setLoading(true)
        async function getArticle() {
            try {
                const res = await api.get(`/article/${article_id}/`)
                const article = res.data
                setCurrentPage(article.current_page)
                setCurrentArticle(article)
                setLoading(false)

            } catch(error) {
                console.log("article", error.response.data)
            }
        }
        getArticle()
        // eslint-disable-next-line
    }, [article_id, article_title])

    // ======================= fetch translation of the clicked word ==================================================
    function handleWordClicked(word) {
        setShowNewMeaningForm(false)
        setDictionaryWords(null)
        setNotFound(null)
        setClickedWord(null)
        setIpa(null)

        const cleanWord = word
            .trim()
            .replace(/^[\p{P}\p{S}]+|[\p{P}\p{S}]+$/gu, "")
            .toLowerCase();

        setClickedWord(cleanWord)
        api.get(`/word/word/${cleanWord}/`)
            .then(res => {
                const result = res.data
                setIpa(result["ipa"])
                // console.log("result", result.data)
                setDictionaryWords(result.data)
            })
            .catch(error => {
               if (error.response) {
                // server responded with error status
               setNotFound(error.response.data.error);
              } else {
                // network / CORS / other failure
                console.log("network error", error.message);
            }})
    }

    // ======================== article -> paragraphs -> words =========================================================
    const articleWords = splitText(currentArticle?.content)
    const pages = calculatePages(articleWords)
    const textInPages = articleWords?.slice((currentPage) * 250, (currentPage) * 250 + 250) // slice, get words from [0-250], page increases/decreases by 1
                        .join(' ')    // join 250 words with space to make it a paragraph
                        .replaceAll("##", "\n\n")
    const paragraphs = textInPages?.split("\n\n").map(p => p.trim())
    // =================================================================================================================



    const divRef = useRef(null)
    function handlePrevPage() {
        if (currentPage > 0){
            const prevPage = currentPage - 1
            setCurrentPage(prevPage)
            updatePageInDB(prevPage)
        }
        else if (currentPage === 0) {
             setCurrentPage(0)
             updatePageInDB(0)
        }
        setFinishReading(false)

        if (totalWords >= currentPage*250){
            setTotalWords(totalWords - 250)
        }
        divRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }

    useEffect(() => {
        let timeNow = new Date().getTime()
        setLastClick(timeNow)
    }, [currentPage, setLastClick])


    function handleNextPage() {
        let timeNow = new Date().getTime()
        if (currentPage < pages - 1) {
            const nextPage = currentPage + 1
            setCurrentPage(nextPage)
            updatePageInDB(nextPage)
            if (lastClick && timeNow > (lastClick + 25000)) {
                handleWordsRead(250)
            }
            setTotalWords(totalWords + 250)
        }
        divRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function handleWordsRead(wordsRead) {

        // apiFetch('/stats', {
        //     method: "POST",
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify({
        //         user_id: user.id,
        //         words_read: wordsRead,
        //     })
        // })
    }


    function handleFinishReading() {
        if ( currentArticle.finished !== true ) {
            try {
                const rest = api.patch(`/article/${currentArticle.id}/`, {finished: true,})
                const lastPageWords = articleWords?.length - (pages - 1)*250
                handleWordsRead(lastPageWords)
                setTotalWords(totalWords + lastPageWords)
                setFinishReading(true)
            } catch (error) {
                console.log(error.response?.data)
            }
        }

    }

    function updatePageInDB(page) {
        try {
            const rest = api.patch(`/article/${currentArticle.id}/`, {current_page: page})
        } catch (error) {
            console.log(error.response?.data)
        }
    }

    return (
        <ArticleContainer className="article-container">
            <ArticleReadingArea
                currentPage={currentPage}
                paragraphs={paragraphs}
                isLoading={isLoading}
                divRef={divRef}
                pages={pages}
                setClickedWordIndex={setClickedWordIndex}
                clickedWordIndex={clickedWordIndex}
                handleWordClicked={handleWordClicked}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
                handleFinishReading={handleFinishReading}
                sentence={sentence}
                setSentence={setSentence}
            />
            <DictionaryArea
                ipa={ipa}
                setIpa={setIpa}
                clickedWord={clickedWord}
                dictionaryWords={dictionaryWords}
                setDictionaryWords={setDictionaryWords}
                wordNotFound={wordNotFound}
                setNotFound={setNotFound}
                isShowNewMeaningForm={isShowNewMeaningForm}
                setShowNewMeaningForm={setShowNewMeaningForm}
            />
        </ArticleContainer>
    )
}
const ArticleContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 424px;
    //flex-direction: row;
   justify-content: center;
    align-items: stretch;
    //gap: 1px;
    margin: 20px auto 0;
    box-sizing: border-box;
    //width: 100%;
    min-height: 450px;
    font-size: 20px;
    line-height: 1.6;
    height: calc(100% - 60px);  // Handle top bar which is 60px
    position: fixed;
`

export default Article