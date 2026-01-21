import styled from "styled-components";
import {FilledButton, StaffDictionaryButton} from "../../styles/buttonStyles";
import {useState, useEffect} from "react";
import {RequiredWarning, Textarea} from "../../styles/formStyles";
import api from "../../api";
import PopupModal from "../PopupModal";
import ToastMessage from "../ToastMessage";
import {showToast} from "../../utils/showToast";


function DictionaryTranslationItem({
    translationItem, wordId, translationIndex,
    clickedWord, wordType, dictionaryWords, setDictionaryWords, searchResult, setSearchResult, searchInputData
}) {
    // translationItem = ["1....", "s1 -- t1", "s2 -- t2", ...],
    // it is one of the translations of each word -> word.translations = ["1...", "2...", ...]

    useEffect(() => {
        // to update the UI instantly
        setTransItem(translationItem)}, [dictionaryWords])

    const [transItem, setTransItem] = useState(translationItem)
    const [textareaError, setTextareaError] = useState(null)
    const [isPopupOpen, setPopupOpen] = useState(false)
    const [error, setError] = useState(null)
    const [isShowToast, setShowToast] = useState(null)
    const [targetTranslationId, setTargetTransId] = useState(null)


    function handleOnChange(e) {
        const name = e.target.name  // need to convert to "Int"
        const value = e.target.value
        const updatedItems = transItem.map((t, index) => (index === parseInt(name) ? value : t) )
        setTransItem(updatedItems)
    }

    function updateTranslationItem(updatedItem, index, msg) {
        setTextareaError(null)

        const data = {
            word_id: wordId,
            translation_index: translationIndex,
            translation: updatedItem,
        }

        api.patch(`/word/update_translation/${wordId}/`, data)
           .then(res => {
               const result = res.data
               // const updatedWords = dictionaryWords.map((dw) => dw.id === result.id ? result : dw)
               // setDictionaryWords(updatedWords)

               if (searchResult) {
                   const updateSearchResult= searchResult.data?.map(dw => dw.id === result.id ? result : dw)
                   setSearchResult({...searchResult, data: updateSearchResult})
                   setTransItem(updatedItem)
               } else {
                 const updatedWords = dictionaryWords?.map(dw => dw.id === result.id ? result : dw)
                   setDictionaryWords(updatedWords)
               }

               setTargetTransId(index)
               showToast(setShowToast, msg)
            })
            .catch(error => {
               if (error.response) {// server responded with error status
                    setError(error.response.data.error);
                    setPopupOpen(true)

                    showToast(setShowToast, "Update failed.")

              } else {// network / CORS / other failure
                   console.log("network error", error.message)
                    setError(error.message);
                    setPopupOpen(true)

                    showToast(setShowToast, "Update failed.")
            }})
    }


    function handleUpdateTranslationItem(tran_item, index) {
        setTextareaError(null)

        if (transItem[index] === "") {
            setTextareaError([index,"Required."])
        } else {
            const updatedItem = transItem.map((original_item, i) => index === i ? tran_item: original_item)
            // console.log(updatedItem)
            updateTranslationItem(updatedItem, index, "Updated!")
        }
    }


    function handleDeleteTranslationItem(tran_item, index) {
        // exclude the removed target by checking the id
        const updatedTransItem = translationItem.filter((original_item, i) => index !== i)
        updateTranslationItem(updatedTransItem, index, "Deleted!")
    }

    function handleAddToSentences(index) {
        const targetItem = transItem.filter((ti, i) => index === i)
        const splitItem = targetItem[0].split("--")
        const targetSentence = splitItem[0]
        const sentenceTranslation = splitItem[1]

        const data = {
            word: clickedWord,
            word_type: wordType,
            sentence: targetSentence.trim(),
            sentence_translation: sentenceTranslation.trim()
        }
        api.post(`/sentence/add/${wordId}/`, data)
               .then(res => {
                   console.log(res.status === 201)
                    if (res.status === 201) {
                       setTargetTransId(index)
                        showToast(setShowToast, "Sentence added!")
                    }
                })
                .catch(error => {
                   if (error.response) {
                   setError(error.response.data.error);
                  } else {
                    console.log("network error", error.message);
                    setError("network error")
                }})
    }

    function handleMoveToSentences(index) {
        setTextareaError(null)

        if (transItem[index] === "") {
            setTextareaError([index,"Required."])
        } else {
            const targetItem = transItem.filter((ti, i) => index === i)
            const splitItem = targetItem[0].split("--")
            const targetSentence = splitItem[0]
            const sentenceTranslation = splitItem[1]
            const updatedItems = translationItem.filter((original_item, i) => index !== i)

            const data = {
                word: clickedWord,
                word_type: wordType,
                translation: updatedItems,
                translation_index: translationIndex,
                sentence: targetSentence.trim(),
                sentence_translation: sentenceTranslation.trim()
            }
            api.post(`/sentence/move/${wordId}/`, data)
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
            {transItem?.map((tran_item, index) => (
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

                    <DictionaryButtonsContainer>
                        <StaffDictionaryButton
                            // disabled={transItems[index] === ""}
                            style={{marginTop: "8px",
                                //cursor: transItems[index] === "" ? "no-drop" : "pointer",
                            }}
                            onClick={ () => handleUpdateTranslationItem(tran_item, index)}
                        >
                            update
                        </StaffDictionaryButton>

                        <StaffDictionaryButton
                            style={{marginTop: "8px", padding: "0"}}
                            onClick={ () => handleMoveToSentences(index)}
                        >
                            Move to sentences
                        </StaffDictionaryButton>

                        <StaffDictionaryButton
                            style={{marginTop: "8px",  padding: "0"}}
                            onClick={ () => handleAddToSentences(index)}
                        >
                            add to sentences
                        </StaffDictionaryButton>

                        <StaffDictionaryButton
                            style={{marginTop: "8px"}}
                            onClick={ () => handleDeleteTranslationItem(tran_item, index)}
                        >
                            Delete
                        </StaffDictionaryButton>
                    </DictionaryButtonsContainer>

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
const DictionaryButtonsContainer = styled.div`
  display: flex; 
  gap:0.5rem;
  justify-content: space-around;
`
export default DictionaryTranslationItem