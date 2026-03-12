import {useParams} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import api from "../api";
import {UserContext} from "../user-content/UserContent";
import styled from "styled-components";
import ArticleReadingArea from "../components/article/ArticleReadingArea";
import {splitText} from "../utils/splitText";
import {calculatePages} from "../utils/calculatePages";
import StaffDictionaryArea from "../components/dictionary/StaffDictionaryArea";
import UserDictionaryArea from "../components/dictionary/UserDictionaryArea";
import UserDictionaryMobile from "../components/dictionary/UserDictionaryMobile";

const WORD_EACH_PAGE = 100

function Article() {

    const { article_title, article_id } = useParams()
    const {currentArticle, setCurrentArticle, currentUser, isLaptop, isTablet, isMobile} = useContext(UserContext)

    const [isLoading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(currentArticle?.current_page)
    const [sentence, setSentence] = useState(null)

    const [clickedWord, setClickedWord] = useState(null)
    const [clickedWordIndex, setClickedWordIndex] = useState(null)

    const [ipa, setIpa] = useState(null)
    const [dictionaryWords, setDictionaryWords] = useState(null)             // {} a word model data
    const [wordNotFound, setNotFound] = useState(null)

    // const [lastClick, setLastClick] = useState(null)

    const [isShowNewMeaningForm, setShowNewMeaningForm] = useState(false)

    const [userDictSearchInputData, setUserDictSearchInputData] = useState("")
    const [userDictSearchResult, setUserDictSearchResult] = useState(null)
    const [userDictSearchError, setUserDictSearchError] = useState(null)

    const [staffDictSearchInputData, setStaffDictSearchInputData] = useState("")
    const [staffDictSearchResult, setStaffDictSearchResult] = useState(null)   // {word, ipa, data(a word model data)}
    const [staffDictSearchError, setStaffDictSearchError] = useState(null)

    const [isMobileDictionaryOpen, setMobileDictionaryOpen] = useState(false)



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
        if (!clickedWord || clickedWord.toLowerCase() !== word.toLowerCase()) {
            setShowNewMeaningForm(false)
            setDictionaryWords(null)
            setClickedWord(null)
            setIpa(null)
            setNotFound(null)

            setUserDictSearchError(null)
            setUserDictSearchResult(null)
            setUserDictSearchInputData("")
            setStaffDictSearchError(null)
            setStaffDictSearchResult(null)
            setStaffDictSearchInputData("")

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
                    setMobileDictionaryOpen(true)
                })
                .catch(error => {
                   if (error.response) {
                    // server responded with error status
                   setNotFound(error.response.data.error);
                  } else {
                    // network / CORS / other failure
                    console.log("network error", error.message);
                }})
        } else {
            setClickedWord(null)
        }

    }

    // ======================== article -> paragraphs -> words =========================================================
    const articleWords = splitText(currentArticle?.content)
    const pages = calculatePages(articleWords, WORD_EACH_PAGE)
    const textInPages = articleWords?.slice(             // slice, get words from [0-250], page increases/decreases by 1
            (currentPage - 1) * WORD_EACH_PAGE,
            (currentPage) * WORD_EACH_PAGE
        ).join(' ')    // join 250 words with space to make it a paragraph
        .replaceAll("##", "\n\n")
    const paragraphs = textInPages?.split("\n\n").map(p => p.trim())
    // =================================================================================================================



    const divRef = useRef(null)
    function handlePrevPage() {
        setClickedWord(null)
        setClickedWordIndex(null)
        setDictionaryWords(null)
        setIpa(null)
        setMobileDictionaryOpen(false)


        if (currentPage > 1){
            const prevPage = currentPage - 1
            setCurrentPage(prevPage)
            updatePage(prevPage)
        }
        else if (currentPage === 1) {
             setCurrentPage(1)
             updatePage(1)
        }

        divRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // useEffect(() => {
    //     let timeNow = new Date().getTime()
    //     setLastClick(timeNow)
    // }, [currentPage, setLastClick])


    function handleNextPage() {
        setClickedWord(null)
        setClickedWordIndex(null)
        setDictionaryWords(null)
        setIpa(null)
        setMobileDictionaryOpen(false)


        if (currentPage < pages) {
            const nextPage = currentPage + 1
            setCurrentPage(nextPage)
            updatePage(nextPage)
        }
        divRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // function handleWordsRead(wordsRead) {
    //     const rest = api.patch(`/article/${currentArticle.id}/`, {finished: true,})
    //
    //     // apiFetch('/stats', {
    //     //     method: "POST",
    //     //     headers: {"Content-Type": "application/json"},
    //     //     body: JSON.stringify({
    //     //         user_id: user.id,
    //     //         words_read: wordsRead,
    //     //     })
    //     // })
    // }


    async function handleFinishReading() {
        if ( currentArticle.finished !== true ) {
            try {
                const res = await api.patch(`/article/${currentArticle.id}/`, {finished: true,})
                const updatedData = res.data
                setCurrentArticle(updatedData)

            } catch (error) {
                console.log(error.response?.data)
            }
        }

    }

    function updatePage(page) {
        api.patch(`/article/${currentArticle.id}/`, {current_page: page})
            .then(res => {
                const updatedData = res.data
                setCurrentArticle(updatedData)
            })
            .catch (error => {
                console.log(error.response?.data)
            })
    }

    return (
        <>
            {currentArticle && (
                <ArticleContainer className="article-container">

                    {/* overlay for mobile dictionary*/}
                    {(!isTablet && !isLaptop ) && isMobileDictionaryOpen && (
                        /* eslint-disable jsx-a11y/anchor-is-valid */
                        /* eslint-disable jsx-a11y/anchor-has-content */

                        <a href="#"
                           className="mobile dictionary-overlay"
                            style={{width: "100%", position: "fixed", height: "120px"}}
                            onClick={() => setMobileDictionaryOpen(false)}
                        />
                    )}

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
                    {(isTablet || isLaptop ) ?
                        (
                            <>
                                {currentUser?.is_staff && clickedWord && (
                                    <StaffDictionaryArea
                                        ipa={ipa}
                                        setIpa={setIpa}
                                        clickedWord={clickedWord}
                                        clickedWordIndex={clickedWordIndex}
                                        dictionaryWords={dictionaryWords}
                                        setDictionaryWords={setDictionaryWords}
                                        wordNotFound={wordNotFound}
                                        setNotFound={setNotFound}
                                        isShowNewMeaningForm={isShowNewMeaningForm}
                                        setShowNewMeaningForm={setShowNewMeaningForm}
                                        searchResult={staffDictSearchResult}
                                        setSearchResult={setStaffDictSearchResult}
                                        searchInputData={staffDictSearchInputData}
                                        setSearchInputData={setStaffDictSearchInputData}
                                        searchError={staffDictSearchError}
                                        setSearchError={setStaffDictSearchError}
                                    />

                                )}

                                { clickedWord && (
                                    <UserDictionaryArea
                                        ipa={ipa}
                                        setIpa={setIpa}
                                        clickedWord={clickedWord}
                                        clickedWordIndex={clickedWordIndex}
                                        dictionaryWords={dictionaryWords}
                                        setDictionaryWords={setDictionaryWords}
                                        wordNotFound={wordNotFound}
                                        setNotFound={setNotFound}
                                        searchResult={userDictSearchResult}
                                        setSearchResult={setUserDictSearchResult}
                                        searchInputData={userDictSearchInputData}
                                        setSearchInputData={setUserDictSearchInputData}
                                        searchError={userDictSearchError}
                                        setSearchError={setUserDictSearchError}
                                    />
                                )}

                            </>
                        )
                        :
                        (
                            <UserDictionaryMobile
                                isMobileDictionaryOpen={isMobileDictionaryOpen}
                                ipa={ipa}
                                setIpa={setIpa}
                                clickedWord={clickedWord}
                                clickedWordIndex={clickedWordIndex}
                                dictionaryWords={dictionaryWords}
                                setDictionaryWords={setDictionaryWords}
                                wordNotFound={wordNotFound}
                                setNotFound={setNotFound}
                                isShowNewMeaningForm={isShowNewMeaningForm}
                                setShowNewMeaningForm={setShowNewMeaningForm}
                                staffDictSearchResult={staffDictSearchResult}
                                setStaffDictSearchResult={setStaffDictSearchResult}
                                staffDictSearchInputData={staffDictSearchInputData}
                                setStaffDictSearchInputData={setStaffDictSearchInputData}
                                staffDictSearchError={staffDictSearchError}
                                setStaffDictSearchError={setStaffDictSearchError}

                                userDictSearchResult={userDictSearchResult}
                                setUserDictSearchResult={setUserDictSearchResult}
                                userDictSearchInputData={userDictSearchInputData}
                                setUserDictSearchInputData={setUserDictSearchInputData}
                                userDictSearchError={userDictSearchError}
                                setUserDictSearchError={setUserDictSearchError}
                            />

                        )
                    }


                </ArticleContainer>
            )}
        </>
    )
}
const ArticleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: stretch;
    box-sizing: border-box;
    min-height: 450px;
    font-size: 20px;
    line-height: 1.6;
    position: fixed;
    padding: 0 1rem;
    margin: 100px auto 0;
   height: calc(100% - 120px)
`

const DictionaryArea = styled.div`
  flex: 1;        /* right column takes half-ish; adjust if you want */
  min-width: 0;
  min-height: 0;
  display: flex;
`;

const DictionaryRow = styled.div`
  width: 100%;
  min-width: 0;
  min-height: 0;
  display: flex;
  gap: 1rem;

  /* if only UserDictionaryArea exists, let it take full width */
  ${({ $twoCols }) => !$twoCols && `
    gap: 0;
  `}
`;

const DictPanel = styled.div`
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;

  /* If you want the single User panel to always fill, this is optional */
  ${({ $full }) => $full && `
    flex: 1;
  `}
`;

const DictionaryRegionMobile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default Article