import styled from "styled-components";
import DictionaryTranslationItems from "./DictionaryTranslationItems";
import arrow_down_icon from "../assets/icons/arrow_down.svg";
import arrow_up_icon from "../assets/icons/arrow_up.svg";
import {useState} from "react";


function DictionaryWordItem({clickedWord, wordItem, dictionaryWords, setDictionaryWords}) {
    // console.log("wordItem", wordItem)
    const wordType = wordItem.word_type
    const translations = wordItem["translations"]

    const [isShowMeaning, setShowMeaning] = useState(true)

    function handleToggleShowMeaning() {
        setShowMeaning(!isShowMeaning)
    }

    return (
        <WordItemContainer className="word-item-container">

            <div style={{display: "flex", justifyContent: "space-between"}}>
                <WordType>{wordType}</WordType>
                {isShowMeaning && (
                    <Img
                        alt="close meaning  icon"
                        src={arrow_up_icon}
                        onClick={handleToggleShowMeaning}

                    />
                )}


                {!isShowMeaning && (
                    <Img
                        alt="search icon"
                        src={arrow_down_icon}
                        onClick={handleToggleShowMeaning}
                    />

                )}

            </div>

            {isShowMeaning && (
                <TranslationListContainer>

                    <WordForms className="word_forms">
                        Forms of "
                            <span style={{fontWeight: "Extrabold"}}>{wordItem.parent}</span>
                        ": {wordItem.notes}
                    </WordForms>


                    {translations?.map((t, index) => {
                        const split_t = t.split(/[;:]+/)
                        return (
                            <DictionaryTranslationItems
                                key={index}
                                wordId={wordItem.id}
                                translationIndex={index}
                                clickedWord={clickedWord}
                                translationItems={split_t}
                                wordType={wordType}
                                dictionaryWords={dictionaryWords}
                                setDictionaryWords={setDictionaryWords}
                            />
                        )}
                    )}
                </TranslationListContainer>
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
`
const WordForms = styled.div`
  font-size: 1rem ;
`

export default DictionaryWordItem