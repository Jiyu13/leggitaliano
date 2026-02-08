import styled from "styled-components";
import DictionaryWordItem from "./DictionaryWordItem";
import DictionaryWordNewMeaningForm from "./DictionaryWordNewMeaningForm";
import {useState} from "react";
import DictionarySearchBar from "./DictionarySearchBar";

function StaffDictionaryArea({
    ipa, setIpa, clickedWord, dictionaryWords, setDictionaryWords, wordNotFound, setNotFound,
    setShowNewMeaningForm, isShowNewMeaningForm, searchInputData, setSearchInputData, searchResult,
    setSearchResult, searchError, setSearchError

}) {
    // const [isShowEditForm, setShowEditForm] = useState(false)
    const [showMeaningId, setShowMeaningId] = useState(null)
    const [showEditFormId, setShowEditFormId] = useState(null)

    const wordToShow = searchResult !== null ? searchResult.word : clickedWord
    const ipaToShow = searchResult !== null ? searchResult.ipa : ipa
    const dictionaryWordsToShow = searchResult !== null ? searchResult.data : dictionaryWords


    return (
        <DictionaryContainer className="dinctionary-area-container" style={{marginRight: "0.25rem"}}>

            <DictionarySection className="dinctionary-section">
                <DictionarySearchBar
                    isStaffDictionary={true}
                    setSearchInputData={setSearchInputData}
                    searchInputData={searchInputData}
                    setSearchResult={setSearchResult}
                    setSearchError={setSearchError}
                    searchError={searchError}
                    setShowMeaningId={setShowMeaningId}
                    setShowNewMeaningForm={setShowNewMeaningForm}
                    isShowNewMeaningForm={isShowNewMeaningForm}
                    setShowEditFormId={setShowEditFormId}
                    setIpa={setIpa}
                />

                {!isShowNewMeaningForm && (
                    <div>
                        <HeadSectionContainer className="staff-dictionary-header">
                        <WordInfoWrapper>
                            <Word>{wordToShow}</Word>
                            <Ipa>{ipaToShow}</Ipa>
                        </WordInfoWrapper>
                        {/*<AddNewButtonWrapper className="add-meaning-button-wrapper" >*/}
                        {/*    <StaffDictionaryButton*/}
                        {/*        style={{width: "100%", padding: "0.75rem"}}*/}
                        {/*        onClick={() => setShowNewMeaningForm(!isShowNewMeaningForm)}*/}
                        {/*    >*/}
                        {/*        New meaning*/}
                        {/*    </StaffDictionaryButton>*/}
                        {/*</AddNewButtonWrapper>*/}

                    </HeadSectionContainer>

                        {!isShowNewMeaningForm && (
                            <DictionaryWrapper className="dinctionary-wrapper">
                                {dictionaryWordsToShow?.map((dw, index) =>
                                    <DictionaryWordItem
                                        key={dw.id}
                                        clickedWord={clickedWord}
                                        wordItem={dw}
                                        wordItemId={dw.id}
                                        dictionaryWords={dictionaryWords}
                                        setDictionaryWords={setDictionaryWords}
                                        // isShowEditForm={isShowEditForm}
                                        // setShowEditForm={setShowEditForm}
                                        setShowMeaningId={setShowMeaningId}
                                        showMeaningId={showMeaningId}
                                        setShowEditFormId={setShowEditFormId}
                                        showEditFormId={showEditFormId}

                                        setSearchResult={setSearchResult}
                                        searchResult={searchResult}
                                        searchInputData={searchInputData}
                                    />
                                )}
                            </DictionaryWrapper>
                        )}

                        { wordNotFound !== null && clickedWord !== null && !isShowNewMeaningForm && searchInputData === "" && (
                            <NotFoundContainer>
                                <div>No results found for "{clickedWord}".</div>
                            </NotFoundContainer>
                        )}

                    </div>
                )}

                {isShowNewMeaningForm && (
                    <DictionaryWordNewMeaningForm
                        setIpa={setIpa}
                        clickedWord={wordToShow}
                        setDictionaryWords={setDictionaryWords}
                        setShowNewMeaningForm={setShowNewMeaningForm}
                        setNotFound={setNotFound}

                        setSearchError={setSearchError}
                        setSearchResult={setSearchResult}
                        searchResult={searchResult}
                        setSearchInputData={setSearchInputData}
                    />
                )}

            </DictionarySection>


        </DictionaryContainer>
    )
}
export const Ipa = styled.div`
    color: #5b80b2;
    font-size: 0.9rem;
`
export const Word = styled.div`
  color: #fff;
  font-weight: bolder;
  padding-right: 1rem;
`
export const NotFoundContainer = styled.div`
  margin-top: 3rem;
`
export const HeadSectionContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
`

export const WordInfoWrapper = styled.div`
  display: flex;
  align-items: baseline;
`
const AddNewButtonWrapper = styled.div``
export const DictionaryWrapper = styled.ul`
    //width: 100%;
    padding: 0 0.75rem 0.75rem;
    overflow-y: auto;
    color: #ddd;
    list-style-type: none;
    margin: 0
`
export const DictionarySection = styled.div`
    width: 100%;
    padding: 0.5rem 0.5rem 1rem;
    overflow-y: auto;
    color: #ddd;
`
export const DictionaryContainer = styled.div`
    display: flex;
    max-width: 450px;
    width: 100%;
    background-color: #333333;
    border-radius: 8px;
`

export default StaffDictionaryArea