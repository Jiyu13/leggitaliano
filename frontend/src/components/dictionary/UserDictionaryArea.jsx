import styled from "styled-components";
import search_icon from "../../assets/icons/search_icon.svg";
import DictionaryWordItem from "./DictionaryWordItem";
import DictionaryWordNewMeaningForm from "./DictionaryWordNewMeaningForm";
import {useState} from "react";
import UserDictionaryWordItem from "./UserDictionaryWordItem";
import {HeadSectionContainer, Ipa, NotFoundContainer, Word} from "./StaffDictionaryArea";


function UserDictionaryArea({
    ipa, setIpa, clickedWord,clickedWordIndex, dictionaryWords, setDictionaryWords, wordNotFound, setNotFound,
}) {

    const [showMeaningId, setShowMeaningId] = useState(null)
    const [showEditFormId, setShowEditFormId] = useState(null)

    return (
        <DictionaryContainer className="dinctionary-area-container">

            <DictionaryWrapper className="dinctionary-section">
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
                    </HeadSectionContainer>
                )}

                {dictionaryWords?.map((dw, index) =>
                    <UserDictionaryWordItem
                        key={index}
                        wordItem={dw}
                        setShowMeaningId={setShowMeaningId}
                        showMeaningId={showMeaningId}
                        setShowEditFormId={setShowEditFormId}
                        showEditFormId={showEditFormId}
                    />
                )}


                { wordNotFound !== null && clickedWord !== null  && (
                    <NotFoundContainer>
                        <div>No results found for "{clickedWord}".</div>
                    </NotFoundContainer>
                )}

            </DictionaryWrapper>


        </DictionaryContainer>
    )
}


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

const DictionaryWrapper = styled.div`
    width: 100%;
    padding: 16px;
    overflow-y: auto;
    color: #ddd;
`
const DictionaryContainer = styled.div`
    display: flex;
    max-width: 450px;
    width: 100%;
  background-color: #333333;
    border-radius: 8px;
`

export default UserDictionaryArea