import StaffDictionaryArea from "./StaffDictionaryArea";
import UserDictionaryArea from "./UserDictionaryArea";
import styled from "styled-components";
import {useContext} from "react";
import {UserContext} from "../../user-content/UserContent";

export default function UserDictionaryMobile({clickedWord, ipa, setIpa, clickedWordIndex, setDictionaryWords, isMobileDictionaryOpen,
    dictionaryWords, wordNotFound, setNotFound, isShowNewMeaningForm, setShowNewMeaningForm,
    staffDictSearchResult, setStaffDictSearchResult, staffDictSearchInputData, setStaffDictSearchInputData, staffDictSearchError, setStaffDictSearchError,
    userDictSearchResult, setUserDictSearchResult, userDictSearchInputData, setUserDictSearchInputData, userDictSearchError, setUserDictSearchError
}) {
    const {currentUser, isMobile} = useContext(UserContext)

    return (
        <>
            {isMobileDictionaryOpen && (
                <MobileDictionaryArea>
                {currentUser?.is_staff && clickedWord && isMobile && (
                    <StaffDictionaryArea
                        ipa={ipa}
                        setIpa={setIpa}
                        clickedWord={clickedWord}
                        clickedWordIndex={clickedWordIndex}
                        dictionaryWords={dictionaryWords}
                        setDictionaryWords={setDictionaryWords}
                        wordNotFound={wordNotFound}
                        setNotFound={setNotFound}
                        isShowNewMeaningForm={isShowNewMeaningForm}
                        setShowNewMeaningForm={setShowNewMeaningForm}
                        searchResult={staffDictSearchResult}
                        setSearchResult={setStaffDictSearchResult}
                        searchInputData={staffDictSearchInputData}
                        setSearchInputData={setStaffDictSearchInputData}
                        searchError={staffDictSearchError}
                        setSearchError={setStaffDictSearchError}
                    />

                )}

                { clickedWord && (
                    <UserDictionaryArea
                        ipa={ipa}
                        setIpa={setIpa}
                        clickedWord={clickedWord}
                        clickedWordIndex={clickedWordIndex}
                        dictionaryWords={dictionaryWords}
                        setDictionaryWords={setDictionaryWords}
                        wordNotFound={wordNotFound}
                        setNotFound={setNotFound}
                        searchResult={userDictSearchResult}
                        setSearchResult={setUserDictSearchResult}
                        searchInputData={userDictSearchInputData}
                        setSearchInputData={setUserDictSearchInputData}
                        searchError={userDictSearchError}
                        setSearchError={setUserDictSearchError}
                    />
                )}
            </MobileDictionaryArea>
            )}
        </>


    )
}
const MobileDictionaryArea = styled.div`
  display: flex;
  justify-content: center;
    height: 70%;
    position: fixed;
    border-top: 2px solid rgb(204, 204, 204);
    border-radius: 8px 8px 0px 0px;
    bottom: 0px;
    width: 100%;
    box-sizing: border-box;
    background-color: #282828;
    color: #ddd;
    //padding: 0 12px 0px 12px;
    z-index: 999;
    overflow: auto;
`