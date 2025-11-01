import styled from "styled-components";
import DictionaryTranslationItems from "./DictionaryTranslationItems";

function DictionaryWordItem({wordItem}) {
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
                            items={split_t}
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