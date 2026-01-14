import styled from "styled-components";
import search_icon from "../../assets/icons/search_icon.svg";
import DictionaryWordItem from "./DictionaryWordItem";
import DictionaryWordNewMeaningForm from "./DictionaryWordNewMeaningForm";
import {FilledButton} from "../../styles/buttonStyles";
import {useState} from "react";

function StaffDictionaryArea({
    ipa, setIpa, clickedWord,clickedWordIndex, dictionaryWords, setDictionaryWords, wordNotFound, setNotFound,
    setShowNewMeaningForm, isShowNewMeaningForm
}) {
    // const [isShowEditForm, setShowEditForm] = useState(false)
    const [showMeaningId, setShowMeaningId] = useState(null)
    const [showEditFormId, setShowEditFormId] = useState(null)

    return (
        <DictionaryContainer className="dinctionary-area-container">

            <DictionarySection className="dinctionary-section">
                {/*<SearchBarContainer>*/}
                {/*    <SearchBar>*/}
                {/*        <Img alt="search icon" src={search_icon}/>*/}
                {/*        <Input*/}
                {/*            type="text"*/}
                {/*            placeholder="Search..."*/}
                {/*        />*/}
                {/*    </SearchBar>*/}
                {/*</SearchBarContainer>*/}
                {clickedWord && (
                    <HeadSectionContainer className="dinctionary-head">
                        <WordInfoWrapper>
                            <Word>{clickedWord}</Word>
                            <Ipa>{ipa}</Ipa>
                        </WordInfoWrapper>
                        <AddNewButtonWrapper className="add-meaning-button-wrapper" >
                            <FilledButton
                                style={{border: "2px solid #a9a9a9", width: "100%", padding: "12px"}}
                                onClick={() => setShowNewMeaningForm(!isShowNewMeaningForm)}
                            >
                                New meaning
                            </FilledButton>
                        </AddNewButtonWrapper>

                    </HeadSectionContainer>
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

                {!isShowNewMeaningForm && (
                    <>
                        {dictionaryWords?.map((dw, index) =>
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
                            />
                        )}
                    </>
                )}

                { wordNotFound !== null && clickedWord !== null && !isShowNewMeaningForm && (
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
    margin-bottom: .5rem;
    padding-bottom: .5rem;
    border-bottom: #fff 1px solid;
`
const DictionarySection = styled.div`
    width: 100%;
    padding: 16px;
    overflow-y: auto;
    color: #ddd;
`
const SearchBarContainer = styled.div`
  display: block;
  height: 50px;
`
const SearchBar = styled.div`
  box-sizing: border-box;
  display: flex;
  //background-color: rgb(169,169,169, 0.5);
  border-radius: 8px;
  border: 2px solid rgb(169,169,169, 0.5);

`
const Img = styled.img`
  margin: 8px;
`
const Input = styled.input`
  width: 100%;
  font-size: 1rem;
  border: none;
  background: none;
  color: #ddd;

  &:hover {
    outline: none;
  }
  &:focus {
    outline: none;
  }
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
`

export default StaffDictionaryArea