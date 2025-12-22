import styled from "styled-components";
import {CustomLink} from "../../styles/formStyles";
import {useEffect, useRef} from "react";
import arrow_down_icon from "../../assets/icons/arrow_down.svg";
import arrow_up_icon from "../../assets/icons/arrow_up.svg";

const SORT_OPTIONS = ["A-Z", "Z-A", "Created Date: New to Old", "Created Date: Old to New"]

function ExploreMenu({setIsOpen, isOpen, setSortOption, sortOption, isFilterFinishedClicked, setFilterFinishedClicked}) {

    function handleSortByClick() {
        setIsOpen(!isOpen)
    }

    let menuRef = useRef()
    useEffect(() => {
      let handler = (e) => {
        if (!menuRef.current.contains(e.target)) {
          setIsOpen(false)
        }
      }
      document.addEventListener("mousedown", handler)

      return() =>{
        document.removeEventListener("mousedown", handler);
      }
    })

    function handleOptionClick(index) {
        const value = SORT_OPTIONS[index]
        setSortOption(value)
        setIsOpen(false)
    }

    function handleFinishedClicked() {
        setFilterFinishedClicked(!isFilterFinishedClicked)
    }

    const sortByText = sortOption ? sortOption : "Sort by"
    const arrow = isOpen ? arrow_up_icon : arrow_down_icon
    const bgColor = isOpen ? "#fff" : "#000"
    const textColor = isOpen ? "#000" : "#fff"

    const filterFinishedBg = isFilterFinishedClicked ? "#fff" : "#000"
    const filterFinishedTextColor = isFilterFinishedClicked ? "#000" : "#fff"

    return (
        <ExploreMenuContainer className='menu-container'>
            <SortByMenuContainer
                ref={menuRef}
                className="sort-by-container"
                style={{background: bgColor, color: textColor}}
            >
                <SortByMenuTrigger onClick={handleSortByClick} className="sort-by-menu-trigger">
                    <OptionText>{sortByText}</OptionText>
                    <Img alt="show meaning icon" src={arrow}/>
                </SortByMenuTrigger>

                {isOpen && (
                  <SortByOptions className="sort-by-options">
                      <OptionsWrapper className="options-wrapper">
                          {SORT_OPTIONS.map((op, index) => (
                              <SortOption
                                  key={index}
                                  onClick={() => handleOptionClick(index)}
                              >
                                  {op}
                              </SortOption>
                          ))}
                      </OptionsWrapper>
                  </SortByOptions>
                )}
            </SortByMenuContainer>

            <FilterOptionContainer
                onClick={handleFinishedClicked} className='filter-container'
                style={{background: filterFinishedBg, color: filterFinishedTextColor}}
            >
                <OptionText>Finished?</OptionText>
            </FilterOptionContainer>

            <AddArticleButtonLink href="/article/add" className='add-button-container'>
                Add
            </AddArticleButtonLink>

        </ExploreMenuContainer>
    )
}
const OptionText = styled.div`
  font-size: 1.2rem;
`
const ExploreMenuContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  align-items: center;
  gap: 8px;
  height: 70px;
`
// ====================== SortBy Container ==========================================
const SortByMenuContainer = styled.div`
  flex: 1;
  position: relative;
  box-sizing: border-box;
  height: 100%;
  //width: 50%;
  display: flex;
  align-items: center;
  border-radius: 45px;
  border: 1px solid #939393;
  //color: #fff;
  padding: 0.2rem 2rem;

  &:hover {
    border: 1px solid #fff;
  }
`;

const SortByMenuTrigger  = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Img = styled.img``
const SortByOptions = styled.div`
  position: absolute;
  top: 120%;   /* directly below parent */
  left: 0;     /* align left edges (or change to right:0 if needed) */

  width: 100%; /* full width of SortByMenuContainer */
  background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.25);
  z-index: 999;
  border-radius: 8px;
`
const OptionsWrapper = styled.div`
  box-sizing: border-box;
  padding: 0.2rem 2rem;

`
const SortOption = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  &:hover{
    cursor: pointer;
  }
`
// ====================== Finished? Filter ==========================================
const FilterOptionContainer = styled.div`
  flex: 1;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 45px;
  border: 1px solid #939393;
  color: #fff;
  padding: 0.2rem 2rem;

  &:hover {
    border: 1px solid #fff;
  }
`
// ====================== Add button ==========================================
const AddArticleButtonLink = styled(CustomLink)`
    flex: 1;
    box-sizing: border-box;
    background-color: rgba(40,44,52, 1);
    height: 100%;
    font-size: 1.2rem;

    color: whitesmoke;
    border: none;
    letter-spacing: 0.1rem;
    cursor: pointer;
    transition: .3s ease;
    text-decoration: none;
    border-radius: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25rem 2rem;
  
    &:hover {
      cursor: pointer;
      text-decoration: none;
      border: 1px solid #fff;
    }
`
export default ExploreMenu