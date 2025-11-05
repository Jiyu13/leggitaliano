import styled from "styled-components";
import {FilledButton} from "../styles/buttonStyles";
import {useState, useEffect} from "react";
import {RequiredWarning} from "../styles/formStyles";
import api from "../api";


function DictionaryTranslationItems({
    translationItems, wordId, translationIndex,
    clickedWord, wordType, dictionaryWords, setDictionaryWords
}) {

    useEffect(() => {setTransItems(translationItems)}, [dictionaryWords])

    const [transItems, setTransItems] = useState(translationItems)
    const [textareaError, setTextareaError] = useState(null)

    function handleOnChange(e) {
        const name = e.target.name  // need to convert to "Int"
        const value = e.target.value
        const updatedItems = transItems.map((t, index) => (index === parseInt(name) ? value : t) )
        setTransItems(updatedItems)
    }

    function updateTranslationItem(updatedItems) {
        const data = {
            word_id: wordId,
            translation_index: translationIndex,
            translation: updatedItems,
        }
        api.patch(`/word/update_translation/${wordId}/`, data)
           .then(res => {
               const result = res.data
               const updatedWords = dictionaryWords.map((dw) => dw.id === result.id ? result : dw)
               setDictionaryWords(updatedWords)
            })
            .catch(error => {
               if (error.response) {// server responded with error status
               console.log(error.response.data.error);
              } else {// network / CORS / other failure
                console.log("network error", error.message);
            }})
    }


    function handleUpdateTranslationItem(tran_item, index) {
        if (transItems[index] === "") {
            setTextareaError([index,"Required."])
        } else {
            const updatedItems = transItems.map((original_item, i) => index === i ? tran_item: original_item)
            updateTranslationItem(updatedItems)
            // const data = {
            //     word_id: wordId,
            //     translation_index: translationIndex,
            //     translation: updatedItems,
            // }
            // api.patch(`/word/update_translation/${wordId}/`, data)
            //    .then(res => {
            //        const result = res.data
            //        const updatedWords = dictionaryWords.map((dw) => dw.id === result.id ? result : dw)
            //        setDictionaryWords(updatedWords)
            //     })
            //     .catch(error => {
            //        if (error.response) {// server responded with error status
            //        console.log(error.response.data.error);
            //       } else {// network / CORS / other failure
            //         console.log("network error", error.message);
            //     }})
        }
    }


    function handleDeleteTranslationItem(tran_item, index) {
        // exclude the removed target by checking the id
        const updatedTransItems = translationItems.filter((original_item, i) => index !== i)
        updateTranslationItem(updatedTransItems)

        // const data = {
        //     word_id: wordId,
        //     translation_index: translationIndex,
        //     translation: updatedTransItems,
        // }
        // api.patch(`/word/update_translation/${wordId}/`, data)
        //    .then(res => {
        //        const result = res.data
        //        const updatedWords = dictionaryWords.map((dw) => dw.id === result.id ? result : dw)
        //        setDictionaryWords(updatedWords)
        //     })
        //     .catch(error => {
        //        if (error.response) {// server responded with error status
        //        console.log(error.response.data.error);
        //       } else {// network / CORS / other failure
        //         console.log("network error", error.message);
        //     }})
    }

    function handleMoveToSentences(index) {
        setTextareaError(null)

        if (transItems[index] === "") {
            setTextareaError([index,"Required."])
        } else {
            const targetItem = transItems.filter((ti, i) => index === i)
            const splitItem = targetItem[0].split(",")
            const targetSentence = splitItem[0]
            const sentenceTranslation = splitItem[1]
            const updatedItems = translationItems.filter((original_item, i) => index !== i)

            const data = {
                word: clickedWord,
                word_type: wordType,
                translation: updatedItems,
                translation_index: translationIndex,
                sentence: targetSentence.trim(),
                sentence_translation: sentenceTranslation.trim()
            }
            api.post(`/sentence/add/${wordId}/`, data)
               .then(res => {
                    const result = res.data
                    const updatedWord = result["word"]
                    const updatedWords = dictionaryWords.map((dw) => dw.id === updatedWord.id ? updatedWord : dw)
                   setDictionaryWords(updatedWords)
                })
                .catch(error => {
                   if (error.response) {
                   console.log(error.response.data.error);
                  } else {
                    console.log("network error", error.message);
                }})
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
                        style={{border: textareaError ? "2px solid #e74c3c" : "2px solid #a9a9a9"}}
                    />

                    {textareaError !== null && textareaError[0] === index && (
                        <RequiredWarning>{textareaError[1]}</RequiredWarning>
                    )}

                    <div style={{display: "flex", gap:"0.5rem"}}>
                        <FilledButton
                            // disabled={transItems[index] === ""}
                            style={{
                                border: "1px solid #fff", marginTop: "8px",
                                //cursor: transItems[index] === "" ? "no-drop" : "pointer",
                            }}
                            onClick={ () => handleUpdateTranslationItem(tran_item, index)}
                        >
                            update
                        </FilledButton>

                        <FilledButton
                            // disabled={transItems[index] === ""}
                            style={{
                                border: "1px solid #fff", marginTop: "8px",
                                //cursor: transItems[index] === "" ? "no-drop" : "pointer",
                            }}
                            onClick={ () => handleMoveToSentences(index)}
                        >
                            Move to sentences
                        </FilledButton>

                        <FilledButton
                            style={{border: "1px solid #fff", marginTop: "8px"}}
                            onClick={ () => handleDeleteTranslationItem(tran_item, index)}
                        >
                            Delete
                        </FilledButton>
                    </div>



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
  color: #ddd;
  background: none;

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