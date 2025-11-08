import styled from "styled-components";
import search_icon from "../assets/icons/search_icon.svg";
import DictionaryWordItem from "./DictionaryWordItem";
import DictionaryTranslationForm from "./DictionaryTranslationForm";
import {FilledButton} from "../styles/buttonStyles";
import {useState} from "react";

function DictionaryArea({
    ipa, setIpa, clickedWord, dictionaryWords, setDictionaryWords, wordNotFound,
    setShowNewMeaningForm, isShowNewMeaningForm
}) {
    // console.log("dictionaryWords", dictionaryWords)


    return (
        <DictionaryContainer className="dinctionary-area-container">
            {/*<SearchBarContainer>*/}
            {/*    <SearchBar>*/}
            {/*        <Img alt="search icon" src={search_icon}/>*/}
            {/*        <Input*/}
            {/*            type="text"*/}
            {/*            placeholder="Search..."*/}
            {/*        />*/}
            {/*    </SearchBar>*/}
            {/*</SearchBarContainer>*/}


            <DictionarySection>

                <HeadSectionContainer>
                    <LeftSection>
                        <Word>{clickedWord}</Word>
                        <Ipa>{ipa}</Ipa>
                    </LeftSection>
                    <RightSection>
                        <FilledButton
                            style={{border: "2px solid #a9a9a9"}}
                            onClick={() => setShowNewMeaningForm(!isShowNewMeaningForm)}
                        >
                            Add new meaning
                        </FilledButton>
                    </RightSection>

                </HeadSectionContainer>

                {isShowNewMeaningForm && (
                    <DictionaryTranslationForm
                        setIpa={setIpa}
                        clickedWord={clickedWord}
                        setDictionaryWords={setDictionaryWords}
                    />
                )}

                {!isShowNewMeaningForm && (
                    <>
                        {dictionaryWords?.map((dw, index) =>
                            <DictionaryWordItem
                                key={index}
                                clickedWord={clickedWord}
                                wordItem={dw}
                                dictionaryWords={dictionaryWords}
                                setDictionaryWords={setDictionaryWords}
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
const Ipa = styled.div`
    color: #5b80b2;
    font-size: 0.9rem;
`
const Word = styled.div`
  font-weight: bolder;
  padding-right: 1rem;
`
const NotFoundContainer = styled.div`
  margin-top: 3rem;
`
const LeftSection = styled.div`
  display: flex;
  align-items: center;
`
const RightSection = styled.div`
  
`
const HeadSectionContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  margin-bottom: 1rem;
`
const DictionarySection = styled.div`
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

const DictionaryContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 725px;
    width: 100%;
    background-color: #333;
    color: #ddd;
    overflow: auto;
    border-radius: 8px;
    padding: 16px; 
    gap: 1rem;
`

export default DictionaryArea