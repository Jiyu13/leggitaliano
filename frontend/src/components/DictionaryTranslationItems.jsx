import styled from "styled-components";

function DictionaryTranslationItems({items}) {
    return (
        <>
            {items?.map((tran_item, index) => (
                <TranslationItem key={index}>
                    <Input
                        type="text"
                        value={tran_item}
                    />
                    <div>
                        <button>add to sentences</button>
                        <button>done</button>
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
  resize: none;
  field-sizing: content;

  &:hover {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`
const TranslationItem = styled.li`
  
`
export default DictionaryTranslationItems