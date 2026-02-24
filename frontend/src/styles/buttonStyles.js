import styled from "styled-components";

export const SubmitInputButton = styled.input`
    background-color: rgba(23,188,90, 1);
    color: whitesmoke;
    padding: 1rem;
    border: none;
    letter-spacing: 0.1rem;
    cursor: pointer;
    transition: .3s ease;
    margin: 0.75rem 0 2rem;
    border-radius: 0.75rem;
    width: 100%;
    font-size: 1rem;
  
    //width: 100%;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px, rgb(51, 51, 51) 0px 0px 0px 2px;
    }
`

export const FilledButton = styled.button`
    background-color: rgba(23,188,90, 1);
    color: rgba(0, 0, 0);
    padding: 12px 24px;
    border: none;
    letter-spacing: 0.1rem;
    cursor: pointer;
    transition: .3s ease;
    //margin: 2rem 0 2rem;
    border-radius: 8px;

    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`

export const StaffDictTranslationButton = styled(FilledButton)`
  margin-top: 8px;
  width: 100%;
  background-color: rgba(137, 188, 248, 0.8);
  &:hover {
    background-color: rgba(137, 188, 248, 1)
  }
`

export const StaffDictionaryButton = styled(FilledButton)`
  background-color: #ffffff;
  color: #000000;
  padding: 0.75rem;
  
  &:hover {
    background-color: rgba(23,188,90, 1);)
  }
`
