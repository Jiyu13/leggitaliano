import styled from "styled-components";
import {FilledButton, SubmitInputButton} from "../styles/buttonStyles";
import search_icon from "../../src/assets/icons/search_icon.svg"

function Home() {

    function handleAddClick() {

    }

    return (
        <HomePageContainer>
            <ExploreMenuContainer>
                <SearchBar>
                    <Img alt="search icon" src={search_icon}/>
                    <Input
                        type="text"
                        defaultValue="Search..."
                    />
                </SearchBar>
                <AddButton onClick={handleAddClick()}>
                    Add
                </AddButton>

            </ExploreMenuContainer>
        </HomePageContainer>

    );
}
const HomePageContainer = styled.div`
  height: 100vh;
  
`
const ExploreMenuContainer = styled.div`
  display: flex;
  height: 50px;
  padding: 12px 150px;
  justify-content: space-between;
  align-items: center;
`

const SearchBar = styled.div`
  box-sizing: border-box;
  display: flex;
  background-color: rgb(169,169,169, 0.2);
  border-radius: 8px;
`
const Img = styled.img`
  margin: 8px;
`
const Input = styled.input`
  border: none;
  font-size: 1rem;
  background: none;
  &:hover {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`
const AddButton = styled(FilledButton)`
`
export default Home