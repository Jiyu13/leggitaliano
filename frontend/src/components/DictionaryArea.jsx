import styled from "styled-components";
import search_icon from "../assets/icons/search_icon.svg";
import DictionaryWordItem from "./DictionaryWordItem";

function DictionaryArea({clickedWord, dictionaryWords}) {
    return (
        <DictionaryContainer className="dinctionary-area-container">
            <SearchBarContainer>
                <SearchBar>
                    <Img alt="search icon" src={search_icon}/>
                    <Input
                        type="text"
                        placeholder="Search..."
                    />
                </SearchBar>
            </SearchBarContainer>


            <DictionarySidebar>
                <div>{clickedWord}</div>

                {dictionaryWords?.map((dw, index) =>
                    <DictionaryWordItem
                        key={dw.index}
                        wordItem={dw}
                    />
                )}

            </DictionarySidebar>


        </DictionaryContainer>
    )
}

const DictionarySidebar = styled.div`
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