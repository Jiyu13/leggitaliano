import styled from "styled-components";
import search_icon from "../../assets/icons/search_icon.svg";
import {useState} from "react";
import UserDictionaryWordItem from "./UserDictionaryWordItem";
import {HeadSectionContainer, Ipa, NotFoundContainer, Word} from "./StaffDictionaryArea";
import api from "../../api";
import UserDictionarySearchResult from "./UserDictionarySearchResult";


function UserDictionaryArea({
    ipa, clickedWord, dictionaryWords, wordNotFound, setNotFound,
    searchInputData, setSearchInputData, searchResult, setSearchResult
}) {

    const [showMeaningId, setShowMeaningId] = useState(null)
    const [searchError, setSearchError] = useState(null)


    function handleInputChange(e) {
        const value = e.target.value
        if (value === "") {
            setSearchInputData("")
            setSearchResult(null)
        } else {
            setSearchInputData(value)
        }
    }

    function handleSearch(e) {
        e.preventDefault()

        setSearchError(null)

        api.get(`/word/word/${searchInputData}/`)
            .then(res => {
                const result = res.data
                result.word = searchInputData
                setSearchResult(result)
            })
            .catch (error => {
                if (error.response) {
                    setSearchError(error.response.data.error);
                } else {
                    console.log("network error", error.message);
                }})
    }

    const wordToShow = searchResult !== null ? searchResult.word : clickedWord
    const ipaToShow = searchResult !== null ? searchResult.ipa : ipa

    const wordMeaningsToShow = searchResult !== null ? searchResult.data : dictionaryWords
    const notFoundWord =  searchError !== null && searchInputData !== "" ? searchInputData : clickedWord

    console.log("wordToShow", wordToShow)

    return (
        <DictionaryContainer className="dinctionary-area-container">
            <SearchBarContainer>
                <SearchBarForm onSubmit={handleSearch}>
                    <Input
                        type="text"
                        placeholder="Search..."
                        value={searchInputData}
                        onChange={handleInputChange}
                    />
                    <Img alt="search icon" src={search_icon}/>
                </SearchBarForm>
            </SearchBarContainer>

            <HeadSectionContainer className="dinctionary-head">
                <WordInfoWrapper>
                    <Word>{wordToShow}</Word>
                    <Ipa>{ipaToShow}</Ipa>
                </WordInfoWrapper>
            </HeadSectionContainer>

            {/*{searchResult !== null ?*/}
            {/*    <HeadSectionContainer className="dinctionary-head">*/}
            {/*        <WordInfoWrapper>*/}
            {/*            <Word>{searchInputData}</Word>*/}
            {/*            <Ipa>{searchResult.ipa}</Ipa>*/}
            {/*        </WordInfoWrapper>*/}
            {/*    </HeadSectionContainer>*/}
            {/*    :*/}
            {/*    <>*/}
            {/*        {clickedWord && (*/}
            {/*            <HeadSectionContainer className="dinctionary-head">*/}
            {/*                <WordInfoWrapper>*/}
            {/*                    <Word>{clickedWord}</Word>*/}
            {/*                    <Ipa>{ipa}</Ipa>*/}
            {/*                </WordInfoWrapper>*/}
            {/*            </HeadSectionContainer>*/}
            {/*        )}*/}
            {/*    </>*/}


            {/*}*/}

            <DictionaryWrapper className="dinctionary-section">

                {searchResult !== null ?
                    <>
                        {searchResult.data?.map((result, index) =>
                            <UserDictionarySearchResult
                                key={index}
                                result={result}
                                setShowMeaningId={setShowMeaningId}
                                showMeaningId={showMeaningId}
                            />
                        )}
                    </>
                    :
                    <>
                        {dictionaryWords?.map((dw, index) =>
                            <UserDictionaryWordItem
                                key={index}
                                wordItem={dw}
                                setShowMeaningId={setShowMeaningId}
                                showMeaningId={showMeaningId}
                            />
                        )}
                    </>
                }

                { searchError !== null &&
                    // searchInputData!== "") | (wordNotFound !== null && clickedWord!== null) &&
                    (
                    <NotFoundContainer>
                        <div>No results found.</div>
                    </NotFoundContainer>
                )}

                { wordNotFound !== null &&
                    // searchInputData!== "") | (wordNotFound !== null && clickedWord!== null) &&
                    (
                    <NotFoundContainer>
                        <div>No results found for "{notFoundWord}".</div>
                    </NotFoundContainer>
                )}

            </DictionaryWrapper>


        </DictionaryContainer>
    )
}


const SearchBarContainer = styled.div`
  height: 50px;
  padding: 0.5rem;
`
const SearchBarForm = styled.form`
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
  padding-left: 0.5rem;

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
    //width: 100%;
    padding: 0 1rem 1rem;
    overflow-y: auto;
    color: #ddd;
`
const DictionaryContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 450px;
    width: 100%;
    background-color: #333333;
    border-radius: 8px;
    box-sizing: border-box;

`

export default UserDictionaryArea