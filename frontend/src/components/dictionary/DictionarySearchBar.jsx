import search_icon from "../../assets/icons/search_icon.svg";
import styled from "styled-components";
import api from "../../api";

export default function DictionarySearchBar({
    setSearchInputData, searchInputData,  setSearchResult, setSearchError, searchError,
}) {

    function handleInputChange(e) {
        const value = e.target.value
        if (value === "") {
            setSearchInputData("")
            setSearchResult(null)
        } else {
            setSearchInputData(value)
        }
        setSearchError(null)
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

    const inputBorder = searchError ? "2px solid rgba(231, 76, 60, 1)" : "2px solid rgba(169,169,169, 0.5)"

    return (
        <SearchBarContainer>
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

            {searchError && (
                 <SearchErrorMessage>"{searchInputData}" doesn't not exist</SearchErrorMessage>
            )}

        </SearchBarContainer>
    )
}

const SearchBarContainer = styled.div`
  //height: 50px;
  padding: 0.5rem;
`
const SearchBarForm = styled.form`
  box-sizing: border-box;
  display: flex;
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
