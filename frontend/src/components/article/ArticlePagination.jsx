import arrow_left from "../../assets/icons/arrow_left_24dp.svg"
import arrow_right from "../../assets/icons/arrow_right_24dp.svg"
import {ReactComponent as CheckIcon} from "../../assets/icons/check_24dp.svg"
import styled from "styled-components";
import {UserContext} from "../../user-content/UserContent";
import {useContext} from "react";


function ArticlePagination({
       currentPage, pages, handlePrevPage, handleNextPage, handleFinishReading,
}) {
    // ===== handle show next/prev page container & update current_page =========

    const { currentArticle } = useContext(UserContext)

    const isFinished = currentArticle?.finished
    const leftArrow = currentPage === 1 ? "hidden" : "visible"

    return(
        <PaginationContainer className="pagination-container">

            <ArrowContainer
                className="arrow-container"
                style={{visibility: leftArrow}}
                onClick={handlePrevPage}
            >
                <ArrowImg src={arrow_left} alt="previous page icon"/>
            </ArrowContainer>

            <NumberContainer className="number-container">
                <NumberDisplay>{currentPage} / {pages}</NumberDisplay>
            </NumberContainer>

            {currentPage === pages ?
                <ArrowContainer onClick={handleFinishReading}>
                    <CheckIconStyled $isFinished={isFinished} aria-label="finish reading icon" />
                </ArrowContainer>
                :
                <ArrowContainer onClick={handleNextPage}>
                    <ArrowImg src={arrow_right} alt="next page icon"/>
                </ArrowContainer>
            }

        </PaginationContainer>
    )
}
const PaginationContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
`
const ArrowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
  
  &:hover  {
    background-color: #4a4a4a;
    border-radius: 8px;
  }
`

const CheckIconStyled = styled(CheckIcon)`
  width: 100%;
  height: 36px;
  color: ${({ $isFinished }) => ( $isFinished ? "rgb(23,188,90)" : "#fff" )};
  transition: color 120ms ease;
  &:hover {
    color: ${({ $isFinished }) => ($isFinished ? "rgb(23,188,90)" : "#fff")};
  }
`

const ArrowImg = styled.img`
  width: 100%;
  height: 36px;
  //filter: brightness(0) saturate(100%) invert(40%) sepia(0%) saturate(0%) hue-rotate(0deg);

  &:hover {
    filter: brightness(0) invert(1)
  }
`
const NumberContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const NumberDisplay = styled.div`
    font-size: 15px;
    display: inline-block;
    vertical-align: top;
    margin-left: 8px;
`
export default ArticlePagination