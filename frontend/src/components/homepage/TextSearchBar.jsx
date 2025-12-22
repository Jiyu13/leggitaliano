import search_icon from "../../assets/icons/search_icon.svg";
import styled from "styled-components";

function TextSearchBar() {
    return (
        <SearchBar>
            <Img alt="search icon" src={search_icon}/>
            <Input
                type="text"
                defaultValue="Search..."
            />
        </SearchBar>
    )
}


const SearchBar = styled.div`
  height: 100%;
  border: .5px solid #fff;
  border-radius: 45px;
  box-sizing: border-box;
  display: flex;
  padding: .5rem .5rem;
  //background-color: rgb(169,169,169, 0.2);
  align-items: center;
  width: calc(100% - 80px);
`
const Img = styled.img`
  width: 36px;
  margin: 8px;
`
const Input = styled.input`
  color: #fff;
  border: none;
  //padding: 12px 24px 12px 0;
  font-size: 1.2rem;
  background: none;
  &:hover {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`

export default TextSearchBar