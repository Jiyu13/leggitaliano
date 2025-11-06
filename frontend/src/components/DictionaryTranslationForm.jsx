import {FieldBox, FormButtonWrapper, FormLabel, OptionBox, SelectBox, Textarea} from "../styles/formStyles";
import {useContext, useState} from "react";
import styled from "styled-components";
import {SubmitInputButton} from "../styles/buttonStyles";
import {UserContext} from "../user-content/UserContent";
import add_another_translation_icon from "../assets/icons/add_24dp.svg";
import remove_this_translation_icon from "../assets/icons/remove_24dp.svg";


function DictionaryTranslationForm({clickedWord}) {
    const {wordTypes} = useContext(UserContext)

    const initialValue = {
        word: clickedWord,
        translations: [""],
        ipa: "",
        notes: [],
        word_type: 0
    }

    const [formData, setFormData] = useState(initialValue)

    function handleInputChange(e) {
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]:value})
    }

    function handleFormSubmit(e) {
        e.preventDefault()
        const formObject = {
            word: clickedWord,
            translations: formData.translations,
            notes: formData.notes,
            ipa: formData.ipa,
            word_type: formData.word_type
        }
        console.log(formObject)

    }

    function handleTranslationChange(e, index) {
        const value = e.target.value
        setFormData(prev => {
            const next = [...prev.translations];
            next[index] = value;
            return { ...prev, translations: next };
        });
    }

    function handleAddButtonClick() {
        setFormData({...formData, translations: [...formData.translations, ""]})
    }

    function handleRemoveButtonClick(index) {
        const updated = formData.translations.filter((tran, idx) => idx !== index)
        setFormData({...formData, translations: updated})
    }
    console.log(formData)

    return (
        <NewWordContainer className="new-word-container">
            <NewWordContainerWrapper>

            </NewWordContainerWrapper>
            <NewWordFormTitle>
                New Word
            </NewWordFormTitle>
            <NewWordFormWrapper className="new-word-form-wrapper">
                <NewWordForm onSubmit={handleFormSubmit} className="form">

                    <FieldBox className="field-box">
                        <FormLabel style={{color: "#ddd"}}>Word</FormLabel>
                        <Textarea
                            className="form-input"
                            type="text"
                            name='word'
                            defaultValue={formData.word}
                            // onChange={handleInputChange}
                            style={{border: "2px solid #a9a9a9"}}

                        />
                    </FieldBox>


                    <FieldBox className="field-box" style={{padding: "1rem 0"}}>
                        <FormLabel style={{color: "#ddd"}}>Word Type</FormLabel>
                        <SelectBox
                            id={formData.word_type}
                            name="word_type"
                            value={formData.word_type}
                            onChange={handleInputChange}
                        >
                            <OptionBox value="" disabled>Select word typet</OptionBox>
                            {wordTypes?.map((type, index) =>
                                <OptionBox
                                    key={index}
                                    value={type.id}
                                >
                                    {type.type}
                                </OptionBox>
                            )}

                        </SelectBox>
                    </FieldBox>

                    <FieldBox className="field-box">
                        <FormLabel style={{color: "#ddd"}}>Ipa</FormLabel>
                        <Textarea
                            className="form-input"
                            type="text"
                            name='ipa'
                            value={formData.ipa}
                            onChange={handleInputChange}
                            style={{border: "2px solid #a9a9a9"}}

                        />
                    </FieldBox>

                    <FieldBox className="field-box">
                        <FormLabel style={{color: "#ddd"}}>Translations</FormLabel>

                        {formData.translations.map((t, index) =>
                            <div style={{display: "flex"}}>
                                <Textarea
                                    className="form-input"
                                    type='text'
                                    name='translations'
                                    value={t}
                                    onChange={(e) => handleTranslationChange(e, index)}
                                    style={{border: "2px solid #a9a9a9"}}

                                />
                                {index === formData?.translations.length - 1 ?

                                    <AddTranslationIconImg
                                        alt="add another translation icon"
                                        src={add_another_translation_icon}
                                        onClick={handleAddButtonClick}
                                    />
                                    :
                                    <AddTranslationIconImg
                                        alt="remove this translation icon"
                                        src={remove_this_translation_icon}
                                        onClick={() => handleRemoveButtonClick(index)}
                                    />
                                }


                            </div>
                        )}


                    </FieldBox>

                    <FieldBox className="field-box">
                        <FormLabel style={{color: "#ddd"}}>Notes</FormLabel>
                        <Textarea
                            className="form-input"
                            type="text"
                            name='notes'
                            value={formData.notes}
                            onChange={handleInputChange}
                            style={{border: "2px solid #a9a9a9"}}

                        />
                    </FieldBox>



                    {/*{loginError && (*/}
                    {/*    <FormErrorContainer style={{marginTop: "1rem"}}>*/}
                    {/*        <li>{loginError}</li>*/}
                    {/*     </FormErrorContainer>*/}
                    {/*)}*/}

                    <FormButtonWrapper>
                        <SubmitInputButton
                            type="submit"
                            value="Add"
                            // disabled={disabledButton}
                            style={{
                                border: "2px solid #a9a9a9", marginTop: "8px"
                                // backgroundColor: disabledButton ? "rgba(40,44,52,.7)" : "rgba(40,44,52, 1)",
                                // cursor: disabledButton ? "no-drop" : "pointer",
                            }}
                        />
                    </FormButtonWrapper>
                </NewWordForm>

            </NewWordFormWrapper>

        </NewWordContainer>
    )
}
const AddTranslationIconImg = styled.img`
  margin: 8px;
  width: 28px;
  height: 28px;
  cursor: pointer;
      border-radius: 25px;


  
  //&:hover {
  //  //background-color:rgb(82, 82, 82);
  //}
  
`
const NewWordForm = styled.form``
const NewWordFormWrapper = styled.div`
  padding: 0 1rem 1rem;
  //background-color: #ffffcc;
`
const NewWordFormTitle = styled.div`
  text-align: center;
  color: #ddd;
  padding: 1rem 1rem 0;
  //background-color: #5b80b2;
`

const NewWordContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const NewWordContainer = styled.div`
  background-color: #222;
  display: block;
  border-radius: 16px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 2rem;
  padding-bottom: 2rem;
`

export default DictionaryTranslationForm