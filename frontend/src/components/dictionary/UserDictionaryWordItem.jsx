import arrow_up_icon from "../../assets/icons/arrow_up.svg";
import arrow_down_icon from "../../assets/icons/arrow_down.svg";
import styled from "styled-components";
import {useRef, useState} from "react";
import UserDictVerbConjugation from "./UserDictVerbConjugation";

function UserDictionaryWordItem({wordItem, setShowMeaningId, showMeaningId,
}) {

    const wordType = wordItem.word_type
    const translations = wordItem["translations"]

    const isShowMeaning = showMeaningId === wordItem.id
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
        setShowMeaningId(prev => prev === wordItem.id ? null : wordItem.id)
        scrollToElement()
    }

    const isVerbWithNotes = wordItem?.parent !== null && wordItem.is_verb
    const isNotVerbWithNotes = wordItem.notes.length > 0 && !wordItem.is_verb

    // function handleEditWordClick() {
    //     setShowMeaningId(null)
    //     setShowEditFormId(prev => prev === wordItem.id ? null : wordItemId)
    //     scrollToElement()
    // }
    return (
        <WordItemContainer className="word-item-container" ref={itemScrollRef} id={wordItem.id}>

            <div
                style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}
                onClick={handleToggleShowMeaning}
            >
                <WordType>
                    {wordType}

                    {
                        wordItem.is_verb && wordItem.parent &&
                        <>
                            <span>&nbsp;→</span>
                            <span style={{fontWeight: "bolder"}}>&nbsp;{wordItem.parent}</span>
                        </>

                    }

                </WordType>
                {isShowMeaning && (
                    <Img
                        style={{margin: "4px"}}
                        alt="close meaning icon"
                        src={arrow_up_icon}
                        // onClick={handleToggleShowMeaning}
                    />
                )}


                {!isShowMeaning && (
                    <Img
                        style={{margin: "4px"}}
                        alt="show meaning icon"
                        src={arrow_down_icon}
                        // onClick={handleToggleShowMeaning}
                    />

                )}
            </div>

            {isShowMeaning && (
                <TranslationListContainer>
                    {isVerbWithNotes && (
                        <WordConjunctions onClick={() => setShowConjunctions(!isShowConjunctions)}>
                            <div>Conjunction of&nbsp;
                                <span style={{fontWeight: "bolder", textDecoration: "underline"}}>{wordItem.parent}</span>
                            </div>
                            <Img
                                alt={isShowConjunctions ? "show conjunction icon " : "close conjunction icon"}
                                src={isShowConjunctions ? arrow_up_icon : arrow_down_icon}
                            />
                        </WordConjunctions>

                    )}

                    {isNotVerbWithNotes && (
                        <WordConjunctions onClick={() => setShowConjunctions(!isShowConjunctions)}>
                            <div>Forms of&nbsp;
                                <span style={{fontWeight: "bolder", textDecoration: "underline"}}>
                                    {wordItem.parent ?  wordItem.parent : wordItem.word}
                                </span>
                            </div>
                            <Img
                                alt={isShowConjunctions ? "show conjunction icon " : "close conjunction icon"}
                                src={isShowConjunctions ? arrow_up_icon : arrow_down_icon}
                            />
                        </WordConjunctions>

                    )}

                    {isShowConjunctions && (
                        <UserDictVerbConjugation
                            wordItem={wordItem}
                        />
                    )}

                    <WordConjunctions
                        style={{marginTop: "1rem"}}
                        onClick={() => setShowMeanings(!isShowMeanings)}
                    >
                        <div>Meanings</div>
                        <Img
                            alt={isShowMeanings ? "show meaning icon " : "close meaning icon"}
                            src={isShowMeanings ? arrow_up_icon : arrow_down_icon}
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
                                    <TranslationWrapper key={t.id}>
                                        <div style={{fontWeight: "Bolder"}}>{extractedMeaning}</div>
                                        <div
                                            style={{
                                                color: "rgb(224, 224, 224)",
                                                backgroundColor: "rgb(86, 86, 86)",
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