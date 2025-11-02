import styled from "styled-components";
import {FilledButton} from "../styles/buttonStyles";
import {useState} from "react";

function DictionaryTranslationItems({items, wordType, setDictionaryWords}) {

    const [transItems, setTransItems] = useState(items)
    const [textareaData, setTextareaData] = useState("")



    function handleOnChange(e) {
        const name = e.target.name  // need to convert to "Int"
        const value = e.target.value
        const updatedItems = transItems.map((t, index) => (index === parseInt(name) ? value : t) )
        setTransItems(updatedItems)
        // setTextareaData(textareaData.trim())
    }

    function handleAddToSentences(index) {
        console.log(transItems[index])
        if (textareaData.trim() === "") {
            // show error
        }

    }
    return (
        <>
            {transItems?.map((tran_item, index) => (
                <TranslationItem key={index}>
                    <Input
                        type="text"
                        name={index}
                        value={tran_item}
                        index={index}
                        onChange={(e) => handleOnChange(e)}
                    />
                    <FilledButton
                        style={{border: "1px solid #fff", marginTop: "8px"}}
                        onClick={ () => handleAddToSentences(index)}
                    >
                        add to sentences
                    </FilledButton>
                        {/*<button>done</button>*/}


                </TranslationItem>
            ))}
        </>
    )
}
const Input = styled.textarea`
  width: 100%;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  resize: none;
  field-sizing: content;
  box-sizing: border-box;
  padding: 12px;

  &:hover {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`
const TranslationItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`
export default DictionaryTranslationItems