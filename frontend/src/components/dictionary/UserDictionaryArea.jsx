import styled from "styled-components";
import {useState} from "react";
import UserDictionaryWordItem from "./UserDictionaryWordItem";
import {HeadSectionContainer, Ipa, NotFoundContainer, Word} from "./StaffDictionaryArea";
import DictionarySearchBar from "./DictionarySearchBar";


function UserDictionaryArea({
    ipa, clickedWord, dictionaryWords, wordNotFound, setNotFound,
    searchInputData, setSearchInputData, searchResult, setSearchResult, searchError, setSearchError
}) {

    const [showMeaningId, setShowMeaningId] = useState(null)



    const wordToShow = searchResult !== null ? searchResult.word : clickedWord
    const ipaToShow = searchResult !== null ? searchResult.ipa : ipa
    const dictionaryWordsToShow = searchResult !== null ? searchResult.data : dictionaryWords

    return (
        <DictionaryContainer className="dinctionary-area-container">

            <DictionarySearchBar
                setSearchInputData={setSearchInputData}
                searchInputData={searchInputData}
                setSearchResult={setSearchResult}
                setSearchError={setSearchError}
                searchError={searchError}
            />

            <HeadSectionContainer className="dinctionary-head">
                <WordInfoWrapper>
                    <Word>{wordToShow}</Word>
                    <Ipa>{ipaToShow}</Ipa>
                </WordInfoWrapper>
            </HeadSectionContainer>

            <DictionaryWrapper className="dinctionary-wrapper">
                {dictionaryWordsToShow?.map((dw, index) =>
                    <li style={{borderTop: index === 0 ? "1px solid #fff": "none"}}>
                        <UserDictionaryWordItem
                          key={index}
                            wordItem={dw}
                            setShowMeaningId={setShowMeaningId}
                            showMeaningId={showMeaningId}
                        />
                    </li>
                 )}

                { wordNotFound !== null &&
                    (
                    <NotFoundContainer>
                        <div>No results found for "{clickedWord}".</div>
                    </NotFoundContainer>
                )}

            </DictionaryWrapper>


        </DictionaryContainer>
    )
}



const WordInfoWrapper = styled.div`
  display: flex;
  align-items: baseline;
`

const DictionaryWrapper = styled.ul`
    //width: 100%;
    padding: 0 1rem 0.75rem;
    overflow-y: auto;
    color: #ddd;
    list-style-type: none;
    margin: 0
`
const DictionaryContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 450px;
    width: 100%;
    background-color: #333333;
    border-radius: 8px;
`

export default UserDictionaryArea