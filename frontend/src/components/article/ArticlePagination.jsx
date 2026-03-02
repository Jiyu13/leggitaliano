import {ReactComponent as ArrowLeftIcon} from "../../assets/icons/arrow_left_24dp.svg"
import {ReactComponent as ArrowRightIcon} from "../../assets/icons/arrow_right_24dp.svg"
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

            <ArrowIcon
                alt="previous page icon"
                style={{visibility: leftArrow}}
                onClick={handlePrevPage}
                as={ArrowLeftIcon}
            />

            <NumberContainer className="number-container">
                <NumberDisplay>{currentPage} / {pages}</NumberDisplay>
            </NumberContainer>

            {currentPage === pages ?
                <CheckIconStyled
                    onClick={handleFinishReading}
                    $isFinished={isFinished}
                    aria-label="finish reading icon"
                />
                :
                <ArrowIcon
                    onClick={handleNextPage}
                    as={ArrowRightIcon}
                    alt="next page icon"
                />
            }

        </PaginationContainer>
    )
}
const PaginationContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
`

const CheckIconStyled = styled(CheckIcon)`
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
  border-radius: 8px;
  
  color: ${({ $isFinished }) => ( $isFinished ? "#fff" : "" )};
  transition: color 120ms ease;
  background-color: ${({ $isFinished }) => ( $isFinished ? "rgba(23,188,90, 1)" : "" )};
  &:hover  {
    color: #fff;
    cursor: pointer;
    background-color: ${({ $isFinished }) => ( $isFinished ? "rgba(23,188,90, 1)" : "#4a4a4a" )};
  }
`

const ArrowIcon = styled.svg`
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
  border-radius: 8px;
  transition: color 120ms ease;

  & path {
    fill: currentColor;
  }
  
  &:hover  {
    color: #fff;
    cursor: pointer;
    background-color: #4a4a4a ;
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