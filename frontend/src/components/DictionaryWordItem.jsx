import styled from "styled-components";
import DictionaryTranslationItems from "./DictionaryTranslationItems";

function DictionaryWordItem({clickedWord, wordItem, dictionaryWords, setDictionaryWords}) {
    // console.log("wordItem", wordItem)
    const wordType = wordItem.word_type
    const translations = wordItem["translations"]
    return (
        <WordItemContainer className="word-item-container">

            <WordType>{wordType}</WordType>

            <TranslationListContainer>
                {translations?.map((t, index) => {
                    const split_t = t.split(/[;:]+/)
                    return (
                        <DictionaryTranslationItems
                            key={index}
                            wordId={wordItem.id}
                            translationIndex={index}
                            clickedWord={clickedWord}
                            translationItems={split_t}
                            wordType={wordType}
                            dictionaryWords={dictionaryWords}
                            setDictionaryWords={setDictionaryWords}
                        />
                    )}
                )}
            </TranslationListContainer>
        </WordItemContainer>
    )

}


const TranslationListContainer = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`
const WordType = styled.div`
  font-size: 1rem;
`
const WordItemContainer = styled.div`
  padding: 1rem 0;
`

export default DictionaryWordItem