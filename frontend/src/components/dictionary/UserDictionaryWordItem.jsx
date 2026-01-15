import arrow_up_icon from "../../assets/icons/arrow_up.svg";
import arrow_down_icon from "../../assets/icons/arrow_down.svg";
import edit_icon from "../../assets/icons/edit_24dp.svg";
import delete_icon from "../../assets/icons/delete_24dp.svg";
import DictionaryTranslationItem from "./DictionaryTranslationItem";
import DictionaryWordEditForm from "./DictionaryWordEditForm";
import styled from "styled-components";
import {useRef, useState} from "react";
import UserDictVerbConjugation from "./UserDictVerbConjugation";

function UserDictionaryWordItem({
                                    wordItem, setShowMeaningId, showMeaningId, setShowEditFormId, showEditFormId,
}) {

    const wordType = wordItem.word_type
    const translations = wordItem["translations"]

    const isShowMeaning = showMeaningId === wordItem.id
    const isShowEditForm = showEditFormId === wordItem.id
    const [isShowConjunctions, setShowConjunctions] = useState(false)
    const [isShowMeanings, setShowMeanings] = useState(true)


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

    // function handleEditWordClick() {
    //     setShowMeaningId(null)
    //     setShowEditFormId(prev => prev === wordItem.id ? null : wordItemId)
    //     scrollToElement()
    // }
    return (
        <WordItemContainer className="word-item-container" ref={itemScrollRef} id={wordItem.id}>

            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <WordType>{wordType}</WordType>
                    {isShowMeaning && (
                        <Img
                            style={{margin: "4px"}}
                            alt="close meaning icon"
                            src={arrow_up_icon}
                            onClick={handleToggleShowMeaning}
                        />
                    )}


                    {!isShowMeaning && (
                        <Img
                            style={{margin: "4px"}}
                            alt="show meaning icon"
                            src={arrow_down_icon}
                            onClick={handleToggleShowMeaning}
                        />

                    )}
                </div>

            </div>

            {isShowMeaning && (
                <TranslationListContainer>
                    {wordItem.parent && wordItem.is_verb && (
                        <WordConjunctions className="">
                            <div>Conjunction of&nbsp;
                                <span style={{fontWeight: "bolder", textDecoration: "underline"}}>{wordItem.parent}</span>
                            </div>
                            <Img
                                alt={isShowConjunctions ? "show conjunction icon " : "close conjunction icon"}
                                src={isShowConjunctions ? arrow_up_icon : arrow_down_icon}
                                onClick={() => setShowConjunctions(!isShowConjunctions)}

                            />
                        </WordConjunctions>

                    )}
                    {isShowConjunctions && (
                        <UserDictVerbConjugation
                            wordItem={wordItem}
                        />
                    )}

                    <WordConjunctions style={{marginTop: "1rem"}}>
                        <div>Meanings</div>
                        <Img
                            alt={isShowMeanings ? "show meaning icon " : "close meaning icon"}
                            src={isShowMeanings ? arrow_up_icon : arrow_down_icon}
                            onClick={() => setShowMeanings(!isShowMeanings)}

                        />
                    </WordConjunctions>

                    {isShowMeanings && (
                        <ol style={{margin: "0.5rem 0"}}>
                           {translations?.map((t, index) => {
                               const regex = /(\d+\.|\(\d+\)|\(\d+\.\))/g
                               const splitMeanings = t.split(/[;:]+/)
                               const extractedMeaning = splitMeanings[0].replace(regex, "")
                               const firstExample = splitMeanings[1]
                                return (
                                    <TranslationWrapper>
                                        <div style={{fontWeight: "Bolder"}}>{extractedMeaning}</div>
                                        <div
                                            style={{
                                                color: "#000",
                                                backgroundColor: "rgba(137, 188, 248, 0.8)",
                                                paddingLeft: "0.5rem",
                                                borderRadius: "8px"
                                            }}
                                        >
                                            {firstExample}
                                        </div>
                                    </TranslationWrapper>
                                )}
                            )}
                       </ol>
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
  border-radius: 8px;
  width: 24px;
  //&:hover {
  //  background-color: #ddd;
  //}
`
const WordConjunctions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem 0.55rem;
  font-size: 1rem ;
  background-color: rgba(60, 118, 61, 0.6);
  &:hover {
    background-color: rgba(60, 118, 61, 1);
  }
  
`

const TranslationWrapper = styled.li`
  font-size: 1rem;
  padding: 0.2rem 0.55rem 0.2rem 0.2rem;
  //background-color: rgba(60, 118, 61, 0.4);

`

export default UserDictionaryWordItem