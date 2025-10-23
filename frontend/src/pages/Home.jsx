import styled from "styled-components";
import {FilledButton, SubmitInputButton} from "../styles/buttonStyles";
import search_icon from "../../src/assets/icons/search_icon.svg"
import ArticleList from "../components/ArticleList";

function Home() {

    function handleAddClick() {}

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

            <ArticleList />

        </HomePageContainer>

    );
}
const HomePageContainer = styled.div`
  height: 100vh;
  width: 100%;
  padding-top: 30px;
`
const ExploreMenuContainer = styled.div`
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`

const SearchBar = styled.div`
  box-sizing: border-box;
  display: flex;
  background-color: rgb(169,169,169, 0.2);
  border-radius: 8px;
  width: calc(100% - 80px);
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
  width: 80px;
`


export default Home