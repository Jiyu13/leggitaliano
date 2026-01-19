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
  color: rgba(255, 255, 255, 1);
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
  color: rgba(255, 255, 255, 1);
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 0.5rem
`

export const FormInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.75rem;
  font-size: 1.2rem;
  border-radius: 8px;
  box-shadow: rgba(25, 4, 69, 0.05) 0px 3px 6px;
  border: 1.5px solid rgb(143, 143, 143);
  background: none;
  color: rgba(255, 255, 255, 1);
  &:hover {
    border: 1.5px solid rgb(255, 255, 255);
  }

  &:focus {
    border: 1.5px solid rgb(255, 255, 255);
  }
`
export const FormTextarea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.75rem;
  font-size: 1.2rem;
  border-radius: 8px;
  box-shadow: rgba(25, 4, 69, 0.05) 0px 3px 6px;
  resize: none;
  background: none;
  border: 1.5px solid rgb(143, 143, 143);
  color: rgba(255, 255, 255, 1);

  &:hover {
    border: 1.5px solid rgb(255, 255, 255);
  }

  &:focus {
    border: 1.5px solid rgb(255, 255, 255);
  }
`

export const Textarea = styled.textarea`
  width: 100%;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  resize: none;
  field-sizing: content;
  box-sizing: border-box;
  padding: 0.75rem;
  color: #ddd;
  background: none;

  &:hover {
    outline: none;
  }
  &:focus {
    outline: none;
  }
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
export const LoginLink = styled(CustomLink)`
  color: rgb(255, 255, 255);
  font-size: 0.9rem;
  margin: 0 6px;
  font-weight: bold;
`
export const LinkText = styled.div`
  color: rgb(197, 197, 197);
  font-size: 0.9rem;
`
// ============== select & options ===========================
export const SelectBox = styled.select`
    //margin-bottom: 1rem;
    padding: 12px 12px;
    border-width: 1px;
    font-size: 0.9rem;
`

export const OptionBox = styled.option`
    font-size: 0.9rem;
    color: #ddd;
    background: none;
`

// ================= required ================================
export const RequiredWarning = styled.span`
    color: rgb(242, 79, 102);
    font-size: 1rem;
`

export const FormErrorContainer = styled.ul`
  color: #e74c3c;
  font-size: 0.9rem;
  padding-left: 15px;  
  margin: 0 0 1rem;
`