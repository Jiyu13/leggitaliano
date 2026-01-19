import styled from "styled-components";
import {useState} from "react";
import {FieldBox, Form, FormInput, FormLabel, FormTextarea, FormWrapper} from "../styles/formStyles";
import {FilledButton} from "../styles/buttonStyles";
import api from "../api";
import {ArticleHeaderContainer} from "../styles/containerStyles";

function ArticleCreate() {

    const initialValues = {title: "", content: ""}
    const [formData, setFormData] = useState(initialValues)
    const [totalWords, setTotalWords ]= useState(0)

    function onValueChange(e) {
        const name = e.target.name
        const value = e.target.value
        if (name === "content") {
            // split content by one or more whitespace characters
            const split_content = value.trim().split(/\s+/)
            const clean_words = split_content.filter(word => word !== "")
            setTotalWords(clean_words.length)
        }
        console.log(name, value)
        setFormData({...formData, [name]: value})
    }

    function handleFormSubmit(e) {
        e.preventDefault()

        const newArticle = {
            title: formData.title,
            content: formData.content
        }

        async function createArticle() {
            try {
                const res = await api.post("/articles/", newArticle)
                const data = res.data
                console.log(data)
                window.location.replace('/');
            } catch (error) {
                console.log(error.response.data)
            }
        }
        createArticle()

    }

    return (
        <ArticleCreatePageContainer className="article-create-page-container">
            <ArticleCreatePageWrapper className="article-create-page-wrapper">
                <FormWrapper className="form-wrapper" style={{paddingTop: "0"}}>
                    <Form
                        onSubmit={handleFormSubmit}
                        className="form"
                        style={{minHeight: '750px', height: "100%", display: "flex", flexDirection: "column", flex: 1}}
                    >

                        <div style={{display: "flex", alignItems: "center", width: "100%", gap: "0.75rem"}}>
                            <FieldBox className="field-box" style={{flex: "1"}}>
                                <FormInput
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    placeholder="Add a title."
                                    onChange={onValueChange}
                                    style={{ marginBottom: 0}}
                                />

                            </FieldBox>
                             <SubmitButtonContainer>
                                    <FilledButton
                                        type="submit"
                                        style={{width:" 120px", padding: "0.75rem", fontSize: "1.2rem"}}
                                    >
                                        Save
                                    </FilledButton>
                                </SubmitButtonContainer>
                        </div>



                        <FieldBox className="field-box">
                            <FormTextarea
                                type="text"
                                name="content"
                                value={formData.content}
                                placeholder="Enter the text."
                                onChange={onValueChange}
                                style={{minHeight: "520px"}}
                            />
                        </FieldBox>
                    </Form>

               </FormWrapper>

            </ArticleCreatePageWrapper>
        </ArticleCreatePageContainer>
    )
}

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 0;
`
const ArticleCreatePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ArticleCreatePageContainer = styled(ArticleHeaderContainer)`
  width: 100%;
  overflow-y: hidden;
  padding: 0 1rem;
`
export default ArticleCreate;