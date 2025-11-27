import styled from "styled-components";
import {FilledButton} from "../styles/buttonStyles";
import {useState, useEffect} from "react";
import {RequiredWarning, Textarea} from "../styles/formStyles";
import api from "../api";
import PopupModal from "./PopupModal";
import ToastMessage from "./ToastMessage";


function DictionaryTranslationItems({
    translationItems, wordId, translationIndex,
    clickedWord, wordType, dictionaryWords, setDictionaryWords
}) {

    useEffect(() => {setTransItems(translationItems)}, [dictionaryWords])

    const [transItems, setTransItems] = useState(translationItems)
    const [textareaError, setTextareaError] = useState(null)
    const [isPopupOpen, setPopupOpen] = useState(false)
    const [error, setError] = useState(null)
    const [isShowToast, setShowToast] = useState(null)
    const [targetTranslationId, setTargetTransId] = useState(null)


    function handleOnChange(e) {
        const name = e.target.name  // need to convert to "Int"
        const value = e.target.value
        const updatedItems = transItems.map((t, index) => (index === parseInt(name) ? value : t) )
        setTransItems(updatedItems)
    }

    function updateTranslationItem(updatedItems, index, msg) {
        setTextareaError(null)

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
               setTargetTransId(index)
               setShowToast(msg)
               setTimeout(function() {
                    setShowToast(null)
               }, 1000)

            })
            .catch(error => {
               if (error.response) {// server responded with error status
                    setError(error.response.data.error);
                    setPopupOpen(true)

                    setShowToast("Update failed.")
                        setTimeout(function() {
                        setShowToast(null)
                    }, 1000)

              } else {// network / CORS / other failure
                   console.log("network error", error.message)
                    setError(error.message);
                    setPopupOpen(true)
                    setShowToast("Update failed.")
                    setTimeout(function() {
                        setShowToast(null)
                    }, 1000)

            }})
    }


    function handleUpdateTranslationItem(tran_item, index) {
        setTextareaError(null)

        if (transItems[index] === "") {
            setTextareaError([index,"Required."])
        } else {
            const updatedItems = transItems.map((original_item, i) => index === i ? tran_item: original_item)
            updateTranslationItem(updatedItems, index, "Updated!")
        }
    }


    function handleDeleteTranslationItem(tran_item, index) {
        // exclude the removed target by checking the id
        const updatedTransItems = translationItems.filter((original_item, i) => index !== i)
        updateTranslationItem(updatedTransItems, index, "Deleted!")
    }

    function handleMoveToSentences(index) {
        setTextareaError(null)

        if (transItems[index] === "") {
            setTextareaError([index,"Required."])
        } else {
            const targetItem = transItems.filter((ti, i) => index === i)
            const splitItem = targetItem[0].split("--")
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
                   setError(error.response.data.error);
                  } else {
                    console.log("network error", error.message);
                    setError("network error")
                }})
        }
    }
    return (
        <>
            {isPopupOpen && (
                <PopupModal
                    isOpen={isPopupOpen}
                    title="Update failed"
                    modalText={error}
                    onClose={() => setPopupOpen(false)}
                    handleNoClick={() => setPopupOpen(false)}
                    handleConfirmClick={() => setPopupOpen(false)}
                />
            )}
            {transItems?.map((tran_item, index) => (
                <TranslationItem key={index}>
                    <Textarea
                        type="text"
                        name={index}
                        value={tran_item}
                        index={index}
                        placeholder="Enter meanings / sentences here."
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

                    {isShowToast !== null && targetTranslationId === index &&(
                        <ToastMessage message={isShowToast}/>
                    )}


                </TranslationItem>
            ))}
        </>
    )
}

const TranslationItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`
export default DictionaryTranslationItems