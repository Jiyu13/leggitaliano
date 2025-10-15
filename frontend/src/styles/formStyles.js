import styled from "styled-components";


export const FormPageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(82, 82, 82);
`
export const FormContainer = styled.div`
  width: 350px;
  position: relative;
  max-width: 90%;
  margin-top: auto;
  margin-bottom: auto;

`
export const FormTitle = styled.div`
  text-align: left;
`

export const FormWrapper = styled.div`
  padding: 25px 0 100px;
`
export const Form = styled.form``

export const FieldBox = styled.div`
  //margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`
export const FormLabel = styled.label`
    color: rgb(82, 82, 82);
    font-size: 0.9rem;
    font-weight: bold;
    margin-bottom: 0.2rem
`

export const FormInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 1rem;
  padding: 10px 12px;
  font-size: 1.2rem;
  border-radius: 6px;
  box-shadow: rgba(25, 4, 69, 0.05) 0px 3px 6px;
  border: 1px solid rgba(25, 4, 69, 0.15);
`

export const PasswordWrapper = styled.div`
  position: relative;
  //display: flex;
  //align-items: center;
`;

export const FormButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

// =============== link style ===============================
export const CustomLink = styled.a`
    &:hover {
        text-decoration-line: underline;
        text-decoration-thickness: 2px;
    }
`

// ============== select & options ===========================
export const SelectBox = styled.select`
    margin-bottom: 1rem;
    padding: 12px 12px;
    border-width: 1px;
    font-size: 0.9rem;
`

export const OptionBox = styled.option`
    font-size: 0.8rem;
`

// ================= required ================================
export const RequiredWarning = styled.span`
    color: rgb(242, 79, 102);
    font-size: 1rem;
`