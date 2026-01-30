import {useState} from "react";
import UserDictionaryWordItem from "./UserDictionaryWordItem";
import {
    DictionaryContainer, DictionarySection,
    DictionaryWrapper,
    HeadSectionContainer,
    Ipa,
    NotFoundContainer,
    Word, WordInfoWrapper
} from "./StaffDictionaryArea";
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
            <DictionarySection className="dinctionary-section">

                <DictionarySearchBar
                    isStaffDictionary={false}

                    setSearchInputData={setSearchInputData}
                    searchInputData={searchInputData}
                    setSearchResult={setSearchResult}
                    setSearchError={setSearchError}
                    searchError={searchError}
                    setShowMeaningId={setShowMeaningId}
                />

                <HeadSectionContainer className="dinctionary-head">
                    <WordInfoWrapper>
                        <Word>{wordToShow}</Word>
                        <Ipa>{ipaToShow}</Ipa>
                    </WordInfoWrapper>
                </HeadSectionContainer>

                <DictionaryWrapper className="dinctionary-wrapper">
                    {dictionaryWordsToShow?.map((dw, index) =>
                        // <li
                        //     key={index}
                        //     style={{borderTop: index === 0 ? "1px solid #fff": "none"}}
                        // >
                            <UserDictionaryWordItem
                                wordItem={dw}
                                setShowMeaningId={setShowMeaningId}
                                showMeaningId={showMeaningId}
                            />
                        // </li>
                     )}

                    { wordNotFound !== null && searchInputData === "" &&
                        (
                        <NotFoundContainer>
                            <div>No results found for "{clickedWord}".</div>
                        </NotFoundContainer>
                    )}

                </DictionaryWrapper>
            </DictionarySection>


        </DictionaryContainer>
    )
}

export default UserDictionaryArea