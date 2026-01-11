import { useContext } from "react"
import styled from "styled-components"
import {UserContext} from "../user-content/UserContent";


export default function ArticleWord({
    word, index, paragraphIndex, clickedWordIndex, setClickedWordIndex,
    handleWordClicked, handleGetSentence, setWordExistError
}) {


    function handleClick(e) {
            // setWordExistError(null)
            const value = e.target.innerHTML
            handleWordClicked(value)
            handleGetSentence(value, index)
            setClickedWordIndex([paragraphIndex, index])
    }

    const word_clean = word.toLowerCase().replace("'", "ʻ")      // replace all that's not [a-zā-ūʻ]
    
    
    // const match = vocabularies?.filter((v) => v.hawaiian_clean.toLowerCase() === word_clean)[0]
    let activeStyling = "rgba(31, 240, 115, 0.8)"  // "rgba(112, 161, 255, 0.5)"
    const unactiveStyling = "" //"rgba(112, 161, 255, 0.2"
    // if (match) {
    //     // & word_clean!==""
    //     switch(match.status) {
    //         // studying
    //         case 1:
    //             styling = "rgba(255, 221, 89, 0.5)"
    //             break;
    //         // known
    //         case 2:
    //             styling = ""
    //             break;
    //         // ignored
    //         case 3:
    //             styling = ""
    //             break;
    //         default:
    //             styling = "rgba(112, 161, 255, 0.5)"
    //     }
    // }

     const isActive =
        clickedWordIndex &&
        clickedWordIndex[0] === paragraphIndex &&
        clickedWordIndex[1] === index;

    return (
        <WordContainer
            onClick={handleClick}
            style={{
                backgroundColor: isActive ? activeStyling : unactiveStyling,
                color: isActive ? "#000" : "#FFF"
            }}
        >
            {word}
        </WordContainer>
    )
}

const DisableWordContainer = styled.span`
    pointer-events: none;
    background-color: none;
    margin-right: 10px;
`

const WordContainer = styled.div`
    border-radius: 5px;
    margin-right: 10px;
    margin-bottom: 8px;
    padding: 0px 4px;
    display: inline-block;
    vertical-align: top;
    font-size: 24px;
    &:hover {
        color: #fff;
        background-color:  rgba(31, 240, 115, 0.3); // rgba(112, 161, 255, 0.3); //#bdc3c7;
        cursor: pointer;
    }
`