import search_icon from "../../assets/icons/search_icon.svg";
import styled from "styled-components";
import api from "../../api";
import add_icon from "../../assets/icons/add_24dp.svg";
import {useContext} from "react";
import {UserContext} from "../../user-content/UserContent";



export default function DictionarySearchBar({
    isStaffDictionary, setSearchInputData, searchInputData,  setSearchResult, setSearchError, searchError,
    setShowMeaningId, setShowNewMeaningForm, isShowNewMeaningForm, setShowEditFormId
}) {

    const { currentUser} = useContext(UserContext)


    function handleInputChange(e) {
        const value = e.target.value
        if (value === "") {
            setSearchInputData("")
            setSearchResult(null)
        } else {
            setSearchInputData(value)
        }
        setShowNewMeaningForm?.(false)
        setSearchError(null)
    }

    function handleSearch(e) {
        e.preventDefault()

        setSearchError(null)
        setShowMeaningId(null)
        setShowNewMeaningForm?.(false)
        setShowEditFormId?.(null)

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

    const inputBorder = searchError ? "2px solid rgba(231, 76, 60, 1)" : "2px solid rgba(169,169,169, 1)"

    return (
        <SearchBarContainer>
            <SearchBarWrapper>
                <SearchBarForm
                    onSubmit={handleSearch}
                    style={{border: inputBorder}}
                >

                    <Input
                        type="text"
                        placeholder="Search..."
                        value={searchInputData}
                        onChange={handleInputChange}
                    />
                    <Img
                        alt="search icon"
                        src={search_icon}
                        onClick={handleSearch}
                    />
                </SearchBarForm>

                {currentUser?.is_staff && isStaffDictionary && (
                     <AddButton>
                        <Img
                            alt="add new meaning icon"
                            src={add_icon}
                            onClick={() => setShowNewMeaningForm(!isShowNewMeaningForm)}
                        />
                     </AddButton>
                )}


            </SearchBarWrapper>

            {searchError && (
                 <SearchErrorMessage>"{searchInputData}" doesn't not exist</SearchErrorMessage>
            )}

        </SearchBarContainer>
    )
}

const SearchBarContainer = styled.div`
  padding: 0.5rem 0;
  width: 100%;
`

const SearchBarWrapper = styled.div`
  display: flex;
  width: 100%;
  min-width: 0;     /* helps children shrink */
  gap: 0.2rem;
`
const SearchBarForm = styled.form`
  box-sizing: border-box;
  display: flex;
  border-radius: 8px;
  width: 100%;
  //flex: 1;
  //min-width: 0;     /* KEY: allow shrink inside flex parent */
  `

const AddButton = styled.div`
  //flex: 0 0 auto;
  display: flex;
  align-items: center;
  border: 2px solid rgba(169,169,169, 1);
  border-radius: 8px;
`

const SearchErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.9rem;
  padding-left: 0.5rem;  
  padding-top: 0.5rem;  
`

const Img = styled.img`
  margin: 8px;
  flex: 0 0 auto; /* don't steal width from input */
`
const Input = styled.input`
  flex: 1;          /* KEY: flex instead of width:100% */
  min-width: 0;     /* KEY: prevent overflow */
  //width: 100%;
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
