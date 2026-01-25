import styled from "styled-components";
import search_icon from "../../assets/icons/search_icon.svg";
import DictionaryWordItem from "./DictionaryWordItem";
import DictionaryWordNewMeaningForm from "./DictionaryWordNewMeaningForm";
import {FilledButton, StaffDictionaryButton} from "../../styles/buttonStyles";
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

    const wordTOShow = searchResult !== null ? searchResult.word : clickedWord
    const ipaToShow = searchResult !== null ? searchResult.ipa : ipa
    const dictionaryWordsToShow = searchResult !== null ? searchResult.data : dictionaryWords


    return (
        <DictionaryContainer className="dinctionary-area-container">

            <DictionarySection className="dinctionary-section">
                <DictionarySearchBar
                    setSearchInputData={setSearchInputData}
                    searchInputData={searchInputData}
                    setSearchResult={setSearchResult}
                    setSearchError={setSearchError}
                    searchError={searchError}
                />


                <HeadSectionContainer
                    className="staff-dictionary-header"
                    style={{padding: "0.5rem 0"}}
                >
                    <WordInfoWrapper>
                        <Word>{wordTOShow}</Word>
                        <Ipa>{ipaToShow}</Ipa>
                    </WordInfoWrapper>
                    <AddNewButtonWrapper className="add-meaning-button-wrapper" >
                        <StaffDictionaryButton
                            style={{width: "100%", padding: "0.75rem"}}
                            onClick={() => setShowNewMeaningForm(!isShowNewMeaningForm)}
                        >
                            New meaning
                        </StaffDictionaryButton>
                    </AddNewButtonWrapper>

                </HeadSectionContainer>


                {!isShowNewMeaningForm && (
                    <>
                        {dictionaryWordsToShow?.map((dw, index) =>
                            <DictionaryWordItem
                                key={index}
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
                    </>
                )}


                {isShowNewMeaningForm && (
                    <DictionaryWordNewMeaningForm
                        setIpa={setIpa}
                        clickedWord={clickedWord}
                        setDictionaryWords={setDictionaryWords}
                        setShowNewMeaningForm={setShowNewMeaningForm}
                        setNotFound={setNotFound}
                    />
                )}

                { wordNotFound !== null && clickedWord !== null && !isShowNewMeaningForm && searchInputData === "" && (
                    <NotFoundContainer>
                        <div>No results found for "{clickedWord}".</div>
                    </NotFoundContainer>
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
    padding: 0.5rem 1rem;
`
const DictionarySection = styled.div`
    width: 100%;
    padding: 0 1rem 1rem;
    overflow-y: auto;
    color: #ddd;
`
const WordInfoWrapper = styled.div`
  display: flex;
  align-items: baseline;
`
const AddNewButtonWrapper = styled.div``

const DictionaryContainer = styled.div`
    display: flex;
    max-width: 450px;
    width: 100%;
    background-color: #333333;
    border-radius: 8px;
    margin-right: 0.25rem;
`

export default StaffDictionaryArea