import styled from "styled-components";
import DictionaryTranslationItem from "./DictionaryTranslationItem";
import arrow_down_icon from "../assets/icons/arrow_down.svg";
import arrow_up_icon from "../assets/icons/arrow_up.svg";
import edit_icon from "../assets/icons/edit_24dp.svg"
import delete_icon from "../assets/icons/delete_24dp.svg"
import DictionaryWordEditForm from "./DictionaryWordEditForm";
import api from "../api";
import {useRef} from "react";


function DictionaryWordItem({
    clickedWord, wordItem, wordItemId, dictionaryWords, setDictionaryWords,
    setShowMeaningId, showMeaningId, setShowEditFormId, showEditFormId,
}) {
    // console.log("wordItem", wordItem)
    const wordType = wordItem.word_type
    const translations = wordItem["translations"]
    const notes = wordItem["notes"]

    const isShowMeaning = showMeaningId === wordItem.id
    const isShowEditForm = showEditFormId === wordItem.id

    const itemScrollRef = useRef(null)
    function scrollToElement() {
        // Wait for state updates to finish rendering
        setTimeout(() => {
            itemScrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);  // small delay ensures the element is expanded before scrolling
    }
    function handleToggleShowMeaning() {
        setShowEditFormId(null)
        setShowMeaningId(prev => prev === wordItem.id ? null : wordItem.id)
        scrollToElement()
    }

    function handleEditWordClick() {
        setShowMeaningId(null)
        setShowEditFormId(prev => prev === wordItem.id ? null : wordItemId)
        scrollToElement()
    }

    function handleDeleteWordItemByType() {
        setShowMeaningId(null)
        api.delete(`/word/id/${wordItem.id}/`)
               .then(res => {
                   const updatedWords = dictionaryWords?.filter(dw => {
                       return dw.id !== wordItem.id
                   })
                   setDictionaryWords(updatedWords)
                })
                .catch(error => {
                   if (error.response) {
                   console.log(error.response.data.error);
                  } else {
                    console.log("network error", error.message);
                }})

    }

    return (
        <WordItemContainer className="word-item-container" ref={itemScrollRef} id={wordItem.id}>

            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <WordType>{wordType}</WordType>
                    {isShowMeaning && (
                        <Img
                            alt="close meaning icon"
                            src={arrow_up_icon}
                            onClick={handleToggleShowMeaning}

                        />
                    )}


                    {!isShowMeaning && (
                        <Img
                            alt="show meaning icon"
                            src={arrow_down_icon}
                            onClick={handleToggleShowMeaning}
                        />

                    )}
                </div>
                <div style={{display: "flex", alignItems: "center"}}>
                     <Img
                        alt="edit icon"
                        src={edit_icon}
                        onClick={handleEditWordClick}

                    />
                    <Img
                        alt="delete icon"
                        src={delete_icon}
                        onClick={handleDeleteWordItemByType}

                    />
                </div>


            </div>

            {isShowMeaning && (
                <TranslationListContainer>

                    <WordForms className="word_forms">
                        {wordItem.parent && (
                            <>
                                Forms of "
                                <span style={{fontWeight: "bolder", textDecoration: "underline"}}>
                                    {wordItem.parent}
                                </span>
                                ":
                            </>
                        )}

                        {notes.map((note, index) => (
                            <div key={index}>{note}</div>
                        ))}
                    </WordForms>


                    {translations?.map((t, index) => {
                        const split_t = t.split(/[;:]+/)
                        return (
                            <DictionaryTranslationItem
                                key={index}
                                wordId={wordItem.id}
                                translationIndex={index}
                                clickedWord={clickedWord}
                                translationItem={split_t} // split each point of translation into a list
                                wordType={wordType}
                                dictionaryWords={dictionaryWords}
                                setDictionaryWords={setDictionaryWords}
                            />
                        )}
                    )}
                </TranslationListContainer>
            )}

            {isShowEditForm && (
                <DictionaryWordEditForm
                    word={wordItem}
                    dictionaryWords={dictionaryWords}
                    setDictionaryWords={setDictionaryWords}
                    setShowEditFormId={setShowEditFormId}
                    setShowMeaningId={setShowMeaningId}
                />
            )}


        </WordItemContainer>
    )

}


const TranslationListContainer = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`
const WordType = styled.div`
  font-size: 1rem;
`
const WordItemContainer = styled.div`
  padding: 1rem 0;
`
const Img = styled.img`
  margin: 8px;
  border-radius: 8px;
  width: 24px;
  &:hover {
    background-color: #ddd;
  }
`
const WordForms = styled.div`
  font-size: 1rem ;
`

export default DictionaryWordItem