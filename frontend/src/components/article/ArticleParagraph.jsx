import ArticleWord from "./ArticleWord";
import styled from "styled-components";

export default function ArticleParagraph({words, paragraphIndex, setClickedWordIndex, clickedWordIndex, handleWordClicked, setSentence, setWordExistError}) {

    // build the sentence from the clicked word
    function handleGetSentence(value, index) {

        let start = index - 1
        let end = index + 1
        let string = words[index]
        while (start >= 0) {
            const word = words[start]
            if (word.includes(".") ||word.includes("!") ||word.includes("?") ) break
            string = words[start] + " " + string
            start--
        }

        while (end < words.length) {
            const word = words[end]
            if (word.includes(".") ||word.includes("!") ||word.includes("?") ) {
                string = string + " " + words[end]
                break
            }
            string = string + " " + words[end]
            end ++
        }
        setSentence(string)
        // updateDictionaryWord(value)
    }
    return (
        <ParagraphContainer className="paragraph-container">
                {words.map((word, index) => 
                    <ArticleWord 
                        key={index} 
                        word={word} 
                        index={index}
                        paragraphIndex={paragraphIndex}
                        setClickedWordIndex={setClickedWordIndex}
                        clickedWordIndex={clickedWordIndex}
                        handleWordClicked={handleWordClicked}
                        handleGetSentence={handleGetSentence}
                        setWordExistError={setWordExistError}
                    />
                )}
        </ParagraphContainer>
    )
}

const ParagraphContainer = styled.div`
    border-radius: 10px;
    margin: 18px 0;
`